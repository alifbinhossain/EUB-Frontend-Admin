import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { motion as m } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';

import { useOtherTeachers } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IDepartmentTeachersTableData } from '../../_config/columns/columns.type';
import { useDepartmentsTeachersByUUID } from '../../_config/query';
import { IPortfolioDepartment } from '../../_config/schema';
import {
	PORTFOLIO_DEPARTMENT_TEACHER_NULL,
	PORTFOLIO_DEPARTMENT_TEACHER_SCHEMA,
} from '../../useful-links/_config/schema';
import { Card } from './card';
import DynamicFieldContainer from './container';
import { Header } from './header';
import { ICard } from './types';

const AddOrUpdateCard = lazy(() => import('./card/add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const column = 'sections';

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;
	const { data: teachers } = useOtherTeachers<IFormSelectOption[]>();
	const {
		data,
		postData,
		updateData,
		deleteData,
		invalidateQuery: invalidateTestDetails,
	} = useDepartmentsTeachersByUUID<IPortfolioDepartment>(uuid as string);

	const form = useRHF(PORTFOLIO_DEPARTMENT_TEACHER_SCHEMA, {
		...PORTFOLIO_DEPARTMENT_TEACHER_NULL,
	});

	console.log({
		error: form.formState.errors,
	});

	const [cards, setCards] = useState<ICard[]>([]);

	const { department_teaches } = data || {};

	useEffect(() => {
		if (!isUpdate) return;
		setCards(department_teaches ?? []);
	}, [isUpdate, department_teaches]);

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
		const DISTANCE_OFFSET = 100;

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
		if (department_teaches?.some((el: any) => el.uuid === uuid)) {
			setDeleteItem({
				id: uuid,
				name: uuid,
			});
		} else {
			setCards((prevCards) => prevCards.filter((card) => card.uuid !== uuid));
		}
	};

	const handleSaveCard = (newCard: ICard) => {
		setCards((prevCards) =>
			prevCards?.map((card) => (card.uuid === newCard.uuid ? { ...card, ...newCard } : card))
		);
	};

	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [isUpdateModal, setIsUpdateModal] = useState(false);
	const [formKey, setFormKey] = useState(0);

	const handleCreate = () => {
		form.reset({
			...PORTFOLIO_DEPARTMENT_TEACHER_NULL,
		});
		setIsUpdateModal(false);
		setUpdatedData(null);
		setFormKey((prev) => prev + 1); // force remount
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IDepartmentTeachersTableData | null>(null);

	const handleSaveAll = async () => {
		if (isUpdate) {
			const department_teaches_promise = cards.map((item, index) => {
				delete (item as any).created_at;
				delete (item as any).created_by;
				if (!data?.department_teaches?.some((el: any) => el.uuid === item.uuid)) {
					const newData = {
						...item,

						department_uuid: uuid,
						created_at: getDateTime(),
						index: index + 1,
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/portfolio/department-teachers',
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
						url: `/portfolio/department-teachers/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			Promise.all([...department_teaches_promise])
				.then(() => form.reset(PORTFOLIO_DEPARTMENT_TEACHER_NULL))
				.then(() => {
					invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/portfolio/faculty-members`);
				})
				.catch((error) => {
					console.error('Error updating Office:', error);
				});

			return;
		}

		const new_department_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create Office description

		// delete Office field from data to be sent

		// TODO: Update url and variable name ⬇️

		// Create Office entries
		const department_teaches = [...cards].map((item, index) => ({
			...item,
			department_uuid: new_department_uuid,
			uuid: nanoid(),
			index: index + 1,
			created_at,
			created_by,
		}));

		const department_teaches_promise = department_teaches.map((item) =>
			postData.mutateAsync({
				url: `/portfolio/department-teacher`,
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		Promise.all([...department_teaches_promise]);
		Promise.all([...department_teaches_promise])
			.then(() => form.reset(PORTFOLIO_DEPARTMENT_TEACHER_NULL))
			.then(() => {
				invalidateTestDetails(); // TODO: Update invalidate query
				navigate(`/portfolio/faculty-profile`);
			})
			.catch((error) => {
				console.error('Error adding Office:', error);
			});
	};

	const fliedDefs = [
		{
			header: 'Status',
			accessorKey: 'status',
			type: 'Checkbox',
			view: 'status',
		},
		{
			header: 'Department Head',
			accessorKey: 'department_head',
			type: 'Checkbox',
			view: 'status',
		},
		{
			header: 'Teacher',
			accessorKey: 'teachers_uuid',
			type: 'select',
			placeholder: 'Select Teacher',
			options: teachers || [],
		},
		{
			header: 'Department Head Message',
			accessorKey: 'department_head_message',
			view: 'preview',
		},
		{
			header: 'Designation',
			accessorKey: 'teacher_designation',
			type: 'text',
		},
	];

	const onFormSubmit = (data: any) => {
		if (updatedData?.uuid) {
			const newData = {
				...data,
				uuid: updatedData?.uuid,
			};
			handleSaveCard(newData);

			form.reset({
				uuid: '',
				status: false,
				department_uuid: '',
				teachers_uuid: '',
				teacher_designation: '',
				teacher_initial: '',
				remarks: '',
			});

			setIsOpenAddModal((prev) => !prev);
			setUpdatedData(null);
			return;
		}

		const newCard: any = {
			uuid: nanoid(),
			status: false,
			department_uuid: uuid,
			department_head: data?.department_head,
			teachers_uuid: data?.teachers_uuid,
			teacher_designation: data?.teacher_designation,
			department_head_message: data?.department_head_message,
			remarks: data?.remarks,
		};

		setCards((pv) => [...pv, newCard]);

		form.reset({
			uuid: '',
			status: false,
			department_uuid: '',
			department_head_message: '',
			teachers_uuid: '',
			teacher_designation: '',
			remarks: '',
		});

		setIsOpenAddModal((prev) => !prev);
		setUpdatedData(null);
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
				<DynamicFieldContainer title={`Department of ${data?.name} Faculty Members `} handleAdd={handleCreate}>
					<Header fliedDefs={fliedDefs} />
					{cards?.map((c, index) => {
						const transferData = { ...c };
						return (
							<Card
								open={isOpenAddModal}
								setIsUpdateModal={setIsUpdateModal}
								setUpdatedData={setUpdatedData}
								setOpen={setIsOpenAddModal}
								isEditing={isEditing}
								setEditing={setEditing}
								key={c.uuid}
								updateData={transferData}
								index={index}
								handleDragStart={handleDragStart}
								handleDeleteCard={handleDeleteCard}
								form={form}
								fieldDefs={fliedDefs}
								defaultCard={PORTFOLIO_DEPARTMENT_TEACHER_NULL}
							/>
						);
					})}
					<div data-column='sections' data-before='-1' style={{ opacity: 0, height: '30px' }} />
					<div className=''>
						<m.button
							layout
							onClick={handleSaveAll}
							className='transition-color flex h-9 w-full items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-xs text-neutral-50'
						>
							<span>Save</span>
						</m.button>
					</div>
				</DynamicFieldContainer>
				<AddOrUpdateCard
					key={formKey}
					{...{
						isUpdate: isUpdateModal,
						onSubmit: onFormSubmit,
						url: `/portfolio/department-teachers`,
						open: isOpenAddModal,
						setOpen: setIsOpenAddModal,
						updatedData,
						setUpdatedData,
						postData,
						updateData,
						excludedOption: cards?.map((c) => c.teachers_uuid),
					}}
				/>
				,
				<Suspense fallback={null}>
					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url: `/portfolio/department-teachers`,
							deleteData,
						}}
					/>
				</Suspense>
			</div>
		</>
	);
};

export default AddOrUpdate;
