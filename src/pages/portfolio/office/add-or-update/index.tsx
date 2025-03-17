import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherUser } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { usePortfolioOffice, usePortfolioOfficeByUUID } from '../../_config/query';
import { IOffice, OFFICE_NULL, OFFICE_SCHEMA } from '../../_config/schema';
import { categories } from '../utills';
import { TRANSFER_NULL, TRANSFER_SCHEMA } from './_config/schema';
import { Card } from './card';
import { AddCard } from './card/add-card';
import DynamicFieldContainer from './container';
import { Header } from './header';
import { ICard } from './types';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const column = 'sections';

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const categoryOptions = categories;
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;
	const { data: userOption } = useOtherUser<IFormSelectOption[]>();
	const { url: officeUrl, updateData, imageUpdateData, imagePostData, postData, deleteData } = usePortfolioOffice();
	const { data, invalidateQuery: invalidateTestDetails } = usePortfolioOfficeByUUID<IOffice>(uuid as string);
	const form = useRHF(TRANSFER_SCHEMA, TRANSFER_NULL);
	const formHeader = useRHF(OFFICE_SCHEMA, OFFICE_NULL);
	const { errors } = formHeader.formState;

	const [cards, setCards] = useState<ICard[]>([]);
	useEffect(() => {
		if (isUpdate && data) {
			formHeader.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);
	const { office_entries } = data || {};

	useMemo(() => {
		if (!isUpdate) return;
		setCards(office_entries ?? []);
	}, [data]);

	const [active, setActive] = useState(false);
	const [adding, setAdding] = useState(false);
	const [isEditing, setEditing] = useState(-1);
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);
	const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
		e.dataTransfer.setData('cardId', card.uuid || '');
	};

	const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		const cardId = e.dataTransfer.getData('cardId');

		setActive(false);
		clearHighlights();

		const indicators = getIndicators();
		const { element } = getNearestIndicator(e, indicators);

		const before = element.dataset.before || '-1';

		if (before !== cardId) {
			let copy = [...cards];

			const cardToTransfer = copy.find((c) => c.uuid === cardId);
			if (!cardToTransfer) return;

			copy = copy.filter((c) => c.uuid !== cardId);

			const moveToBack = before === '-1';

			if (moveToBack) {
				copy.push(cardToTransfer);
			} else {
				const insertAtIndex = copy.findIndex((el) => el.uuid === before);
				if (insertAtIndex === undefined) return;

				copy.splice(insertAtIndex, 0, cardToTransfer);
			}

			setCards(copy);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		highlightIndicator(e);

		setActive(true);
	};

	const clearHighlights = (els?: any) => {
		const indicators = els || getIndicators();

		indicators.forEach((i: any) => {
			i.style.opacity = '0';
		});
	};

	const highlightIndicator = (e: any) => {
		const indicators = getIndicators();

		clearHighlights(indicators);

		const el = getNearestIndicator(e, indicators);

		el.element.style.opacity = '1';
	};

	const getNearestIndicator = (e: any, indicators: any) => {
		const DISTANCE_OFFSET = 50;

		const el = indicators.reduce(
			(closest: any, child: any) => {
				const box = child.getBoundingClientRect();

				const offset = e.clientY - (box.top + DISTANCE_OFFSET);

				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child };
				} else {
					return closest;
				}
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1],
			}
		);

		return el;
	};

	const getIndicators = () => {
		return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
	};

	const handleDragLeave = () => {
		clearHighlights();
		setActive(false);
	};

	const handleDeleteCard = (uuid: string) => {
		setDeleteItem({
			id: uuid,
			name: uuid,
		});
		setCards((prevCards) => prevCards.filter((card) => card.uuid !== uuid));
	};

	const handleSaveCard = (newCard: ICard) => {
		setCards((prevCards) =>
			prevCards?.map((card) => (card.uuid === newCard.uuid ? { ...card, ...newCard } : card))
		);
	};
	const handleAddingClick = () => {
		setAdding(true);
		setEditing(-1);
	};
	const handleSaveAll = async () => {
		const isValid = await formHeader.trigger();
		if (!isValid) {
			return;
		}

		if (isUpdate) {
			const office_data = {
				...formHeader.getValues(),
				index: formHeader.getValues('index'),
				updated_at: getDateTime(),
			};
			delete (office_data as { office_entries?: any })['office_entries'];
			const formData = Formdata<IOffice>(office_data);

			imageUpdateData
				.mutateAsync({
					url: `${officeUrl}/${uuid}`,
					updatedData: formData,
					isOnCloseNeeded: false,
				})
				.then(() => {
					const office_entries_promise = cards.map((item, index) => {
						delete (item as any).created_at;
						delete (item as any).created_by;
						if (!data?.office_entries?.some((el: any) => el.uuid === item.uuid)) {
							const newData = {
								...item,
								office_uuid: uuid,
								created_at: getDateTime(),
								index: index + 1,
								created_by: user?.uuid,
								uuid: nanoid(),
							};

							return postData.mutateAsync({
								url: '/portfolio/office-entry',
								newData: newData,
								isOnCloseNeeded: false,
							});
						} else {
							const updatedData = {
								...item,
								index: index + 1,
								updated_at: getDateTime(),
							};
							return updateData.mutateAsync({
								url: `/portfolio/office-entry/${item.uuid}`,
								updatedData,
								isOnCloseNeeded: false,
							});
						}
					});

					Promise.all([...office_entries_promise]);
				})
				.then(() => form.reset(OFFICE_NULL))
				.then(() => {
					invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/portfolio/office`);
				})
				.catch((error) => {
					console.error('Error updating Office:', error);
				});

			return;
		}

		const new_office_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create Office description

		const office_data = {
			...formHeader.getValues(),
			index: formHeader.getValues('index'),
			uuid: new_office_uuid,
			created_at,
			created_by,
		};
		const formData = Formdata<IOffice>(office_data);
		// delete Office field from data to be sent

		if ('office_entries' in office_data) {
			delete (office_data as { office_entries?: any })['office_entries'];
		}

		// TODO: Update url and variable name ⬇️
		imagePostData
			.mutateAsync({
				url: officeUrl,
				newData: formData,
				isOnCloseNeeded: false,
			})
			.then(() => {
				// Create Office entries
				const office_entries = [...cards].map((item, index) => ({
					...item,
					office_uuid: new_office_uuid,
					uuid: nanoid(),
					index: index + 1,
					created_at,
					created_by,
				}));

				const office_entries_promise = office_entries.map((item) =>
					postData.mutateAsync({
						url: `/portfolio/office-entry`,
						newData: item,
						isOnCloseNeeded: false,
					})
				);

				Promise.all([...office_entries_promise]);
			})
			.then(() => form.reset(OFFICE_NULL))
			.then(() => {
				invalidateTestDetails(); // TODO: Update invalidate query
				navigate(`/portfolio/office`);
			})
			.catch((error) => {
				console.error('Error adding Office:', error);
			});
	};
	const fliedDefs = [
		{
			header: 'User',
			accessorKey: 'user_uuid',
			type: 'select',
			placeholder: 'Select User',
			options: userOption || [],
		},
		{
			header: 'Designation',
			accessorKey: 'designation',
			type: 'text',
			placeholder: 'Designation',
		},
		{
			header: 'Phone',
			accessorKey: 'user_phone',
			type: 'text',
			placeholder: 'Phone',
		},
		{
			header: 'Email',
			accessorKey: 'user_email',
			type: 'text',
			placeholder: 'Email',
		},
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'textarea',
		},
	];
	const onSubmit = (data: any) => {
		if (!data) return;

		const newCard: any = {
			uuid: nanoid(),
			office_uuid: '',
			user_uuid: data?.user_uuid,
			user_email: data?.user_email,
			user_phone: data?.user_phone,
			designation: data?.designation,
			remarks: data?.remarks,
		};
		setCards((pv) => [...pv, newCard]);
		form.reset({
			uuid: '',
			office_uuid: '',
			user_uuid: '',
			user_email: '',
			user_phone: '',
			designation: '',
			remarks: '',
		});
		setAdding(false);
	};
	return (
		<>
			<div
				onDrop={handleDragEnd}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				className={`flex flex-col transition-colors ${active ? 'bg-secondary/5' : 'bg-neutral-800/0'}`}
			>
				<FormProvider {...form}>
					<CoreForm.Section title={`Information`}>
						<FormField
							control={formHeader.control}
							name='index'
							render={(props) => (
								<div className='flex flex-col'>
									<CoreForm.Input type='number' {...props} />
									{errors.index && <span className='text-red-500'>{errors.index.message}</span>}
								</div>
							)}
						/>

						<FormField
							control={formHeader.control}
							name='title'
							render={(props) => (
								<div className='flex flex-col'>
									<CoreForm.Input {...props} />
									{errors.title && <span className='text-red-500'>{errors.title.message}</span>}
								</div>
							)}
						/>
						<FormField
							control={formHeader.control}
							name='category'
							render={(props) => (
								<div className='flex flex-col'>
									<CoreForm.ReactSelect
										label='Category'
										placeholder='Select Category'
										options={categoryOptions!}
										{...props}
									/>
									{errors.category && <span className='text-red-500'>{errors.category.message}</span>}
								</div>
							)}
						/>
						<FormField
							control={formHeader.control}
							name='image'
							render={(props) => (
								<div className='flex flex-col'>
									<CoreForm.FileUpload isUpdate={isUpdate} {...props} />
									{errors.image && (
										<span className='text-red-500-sm'>{errors.image.message?.toString()}</span>
									)}
								</div>
							)}
						/>
						<FormField
							control={formHeader.control}
							name='remarks'
							render={(props) => (
								<div className='flex flex-col'>
									<CoreForm.Textarea {...props} />
									{errors.remarks && <span className='text-red-500'>{errors.remarks.message}</span>}
								</div>
							)}
						/>
					</CoreForm.Section>
				</FormProvider>
				<DynamicFieldContainer title={'Office Entries'} handleAdd={handleAddingClick}>
					<Header fliedDefs={fliedDefs} />
					{cards?.map((c, index) => {
						const transferData = { ...c };
						return (
							<Card
								isEditing={isEditing}
								setEditing={setEditing}
								key={c.uuid}
								updateData={transferData}
								index={index}
								handleDragStart={handleDragStart}
								handleDeleteCard={handleDeleteCard}
								handleSaveCard={handleSaveCard}
								form={form}
								fieldDefs={fliedDefs}
								defaultCard={TRANSFER_NULL}
							/>
						);
					})}
					<div data-column='sections' data-before='-1' style={{ opacity: 0, height: '10px' }} />
				</DynamicFieldContainer>
				<AddCard
					onSubmit={onSubmit}
					fieldDefs={fliedDefs}
					form={form}
					setCards={setCards}
					handleSaveAll={handleSaveAll}
					adding={adding}
					setAdding={setAdding}
					defaultCard={TRANSFER_NULL}
					isEditing={isEditing}
					setEditing={setEditing}
				/>

				<Suspense fallback={null}>
					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url: `/portfolio/office-entry`,
							deleteData,
						}}
					/>
				</Suspense>
			</div>
		</>
	);
};

export default AddOrUpdate;
