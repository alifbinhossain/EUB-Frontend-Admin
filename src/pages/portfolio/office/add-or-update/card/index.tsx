import React, { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';
import { set } from 'lodash';
import { a } from 'node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools-Cn7cKi7o';
import { FormProvider } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FormField } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import CoreForm from '@core/form';

import { AddCardFormData, ICard } from '../types';

const column = 'sections';
export const Card = ({
	isEditing,
	setEditing,
	defaultCard,
	handleDragStart,
	handleDeleteCard,
	handleSaveCard,
	index,
	fieldDefs,
	form,
	updateData,
}: {
	index: number;
	handleDragStart?: (e: React.DragEvent<HTMLDivElement>, card: ICard) => void;
	handleDeleteCard: (uuid: string) => void;
	handleSaveCard: (newCard: ICard) => void;
} & { form: any } & { fieldDefs: any } & { updateData: any; defaultCard: any } & {
	isEditing: any;
	setEditing: any;
}) => {
	const [data, setData] = useState(updateData);

	useEffect(() => {
		setData(updateData);
	}, [updateData]);

	const onSubmit = (data: AddCardFormData) => {
		if (!data.uuid || !data.uuid.trim().length) return;

		handleSave(data);
		form.reset(defaultCard);
		setEditing(-1);
	};
	const handleEdit = () => {
		setEditing(data.index);
		form.reset(data);
	};

	const handleSave = (newCard: any) => {
		handleSaveCard(newCard);
		form.reset(newCard);
		setEditing(-1);
	};

	const handleCancelEdit = () => {
		setData(data);
		form.reset(data);
		setEditing(-1);
	};

	return (
		<>
			<div
				data-before={updateData.uuid || '-1'}
				data-column={column}
				className='my-0.5 h-0.5 w-full bg-violet-400 opacity-0'
			/>
			<m.div
				layout
				layoutId={updateData.uuid}
				draggable='true'
				onDragStart={(e: any) => handleDragStart!(e, data)}
				className='cursor-grab rounded border border-neutral-700 bg-secondary/10 p-3 active:cursor-grabbing'
			>
				{isEditing === data?.index ? (
					<FormProvider {...form}>
						<m.form layout onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2'>
							{fieldDefs
								.filter((fieldDef: any) => !fieldDef.hidden)
								.map((fieldDef: any) => {
									if (fieldDef.isLoading) {
										return <Skeleton className='h-8 w-full bg-secondary/10' />;
									} else {
										return (
											<div className='flex-1'>
												{fieldDef.type === 'text' && (
													<FormField
														control={form.control}
														name={`${fieldDef.accessorKey}`}
														render={(props) => (
															<CoreForm.Input
																type={'text'}
																disableLabel
																placeholder={fieldDef.placeholder}
																{...props}
															/>
														)}
													/>
												)}

												{fieldDef.type === 'number' && (
													<FormField
														control={form.control}
														name={`${fieldDef.accessorKey}`}
														render={(props) => (
															<CoreForm.Input
																type='number'
																disableLabel
																placeholder={fieldDef.placeholder}
																{...props}
															/>
														)}
													/>
												)}
												{fieldDef.type === 'textarea' && (
													<FormField
														control={form.control}
														name={`${fieldDef.accessorKey}`}
														render={(props) => (
															<CoreForm.Textarea
																disableLabel
																placeholder={fieldDef.placeholder}
																{...props}
															/>
														)}
													/>
												)}

												{fieldDef.type === 'select' && (
													<FormField
														control={form.control}
														name={`${fieldDef.accessorKey}`}
														render={(props) => (
															<CoreForm.ReactSelect
																menuPortalTarget={document.body}
																options={fieldDef.options}
																placeholder={fieldDef.placeholder}
																disableLabel
																{...props}
															/>
														)}
													/>
												)}
											</div>
										);
									}
								})}
							<div className='mt-1.5 flex items-center justify-end gap-1.5'>
								<button
									onClick={handleCancelEdit}
									type='button'
									className='flex items-center gap-1.5 rounded bg-red-500 px-3 py-1.5 text-xs text-neutral-50 transition-colors hover:bg-red-600'
								>
									Close
								</button>
								<button
									type='submit'
									className='flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs text-neutral-50 transition-colors hover:bg-neutral-600'
								>
									<span>Save</span>
								</button>
							</div>
						</m.form>
					</FormProvider>
				) : (
					<div className='flex items-center justify-between gap-2'>
						<div className='text-sm'>#{(index ?? 0) + 1}&emsp;</div>
						<br />
						{fieldDefs
							.filter((fieldDef: any) => !fieldDef.hidden)
							.map((fieldDef: any) => {
								if (fieldDef.type === 'select') {
									const selectedOption = fieldDef.options.find(
										(option: any) =>
											option.value === data[fieldDef.accessorKey as keyof typeof data]
									);
									return (
										<p key={fieldDef.accessorKey} className='flex-1 text-sm'>
											{selectedOption?.label}
										</p>
									);
								}
								return (
									<p key={fieldDef.accessorKey} className='flex-1 text-sm'>
										{data[fieldDef.accessorKey as keyof typeof data]}
									</p>
								);
							})}
						<div className='flex gap-2'>
							<FieldActionButton
								handleEdit={() => handleEdit()}
								handleRemove={() => handleDeleteCard(data.uuid!)}
								index={data.index!}
							/>
						</div>
					</div>
				)}
			</m.div>
		</>
	);
};
