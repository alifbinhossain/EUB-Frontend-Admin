import { Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import { useOtherSubCategory, useOtherVendor } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { ICapitalTableData } from './config/columns/columns.type';
import { useCapital, useCapitalDetails } from './config/query';
import { CAPITAL_NULL, CAPITAL_SCHEMA, ICapital } from './config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';
import useGenerateGeneralNotes from './useGenerateGeneralNotes';
import useGenerateItemWorkOrder from './useGenerateItemWorkOrder';
import { status } from './utils';

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();
	const [subCategory, setSubCategory] = useState<string | null>(null);

	const { user } = useAuth();
	const {
		data,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateCapitalDetails,
	} = useCapitalDetails<ICapitalTableData>(uuid as string);

	const { invalidateQuery } = useCapital<ICapitalTableData[]>();
	const { data: subCategoryList } = useOtherSubCategory<IFormSelectOption[]>();
	const { data: vendorList } = useOtherVendor<IFormSelectOption[]>();

	const form = useRHF(CAPITAL_SCHEMA, CAPITAL_NULL);

	const {
		fields: quotationFields,
		append: appendQuotation,
		remove: removeQuotation,
	} = useFieldArray({
		control: form.control,
		name: 'quotations',
	});

	const {
		fields: itemsFields,
		append: appendItems,
		remove: removeItems,
	} = useFieldArray({
		control: form.control,
		name: 'items',
	});

	const {
		fields: generalNotesFields,
		append: appendGeneralNotes,
		remove: removeGeneralNotes,
	} = useFieldArray({
		control: form.control,
		name: 'general_notes',
	});

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			// Reset form values
			form.reset(data);

			// Set subCategory
			setSubCategory(
				(subCategoryList?.find((item) => item.value === data.sub_category_uuid)?.label as string) || null
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: ICapital) {
		const { quotations, general_notes, items, ...rest } = values;

		// * Filtered entries
		const filteredItems = items.filter((entry) => (entry.quantity ?? 0) > 0 && entry.item_uuid);

		if (subCategory === 'Items' && filteredItems.length === 0) {
			toast.warning('please add at least one item entry');
			return;
		}

		if (isUpdate) {
			// UPDATE ITEM

			const itemUpdatedData = {
				...rest,
				updated_at: getDateTime(),
			};

			updateData
				.mutateAsync({
					url: `/procure/capital/${uuid}`,
					updatedData: itemUpdatedData,
				})
				.then(() => {
					// * UPDATE FOR QUOTATIONS
					if (quotations.length > 0) {
						const quotationsUpdatePromise = quotations.map((entry) => {
							if (entry.uuid) {
								const entryUpdateData = {
									...entry,
									updated_at: getDateTime(),
								};
								return updateData.mutateAsync({
									url: `/procure/capital-vendor/${entry.uuid}`,
									updatedData: entryUpdateData,
								});
							} else {
								const entryData = {
									...entry,
									created_at: getDateTime(),
									created_by: user?.uuid,
									uuid: nanoid(),
									capital_uuid: uuid,
								};
								return postData.mutateAsync({
									url: `/procure/capital-vendor`,
									newData: entryData,
								});
							}
						});

						Promise.all([...quotationsUpdatePromise]);
					}

					// * UPDATE FOR ITEMS
					if (filteredItems.length > 0) {
						const itemsPromise = filteredItems.map((entry) => {
							if (entry.uuid) {
								const entryUpdateData = {
									...entry,
									received_date: entry.is_received ? getDateTime() : null,
									updated_at: getDateTime(),
								};
								return updateData.mutateAsync({
									url: `/procure/item-work-order-entry/${entry.uuid}`,
									updatedData: entryUpdateData,
								});
							} else {
								const entryData = {
									...entry,
									received_date: entry.is_received ? getDateTime() : null,
									capital_uuid: uuid,
									created_at: getDateTime(),
									created_by: user?.uuid,
									uuid: nanoid(),
								};
								return postData.mutateAsync({
									url: `/procure/item-work-order-entry`,
									newData: entryData,
								});
							}
						});
						Promise.all([...itemsPromise]);
					}

					// * UPDATE FOR GENERAL NOTES
					if (general_notes.length > 0) {
						const generalNotesUpdatePromise = general_notes.map((entry) => {
							if (entry.uuid) {
								const entryUpdateData = {
									...entry,
									updated_at: getDateTime(),
								};
								return updateData.mutateAsync({
									url: `/procure/general-note/${entry.uuid}`,
									updatedData: entryUpdateData,
								});
							} else {
								const entryData = {
									...entry,
									created_at: getDateTime(),
									created_by: user?.uuid,
									uuid: nanoid(),
									capital_uuid: uuid,
								};
								return postData.mutateAsync({
									url: `/procure/general-note`,
									newData: entryData,
								});
							}
						});
						Promise.all([...generalNotesUpdatePromise]);
					}
				})
				.then(() => {
					invalidateQuery();
					invalidateCapitalDetails();
					navigate('/procurement/procure');
				})
				.catch((error) => {
					console.error('Error updating news:', error);
				});
		} else {
			// ADD NEW ITEM

			const itemData = {
				...rest,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			};

			postData
				.mutateAsync({
					url: '/procure/capital',
					newData: itemData,
				})
				.then(() => {
					// * ENTRY FOR QUOTATIONS
					if (quotations.length > 0) {
						const quotationsPromise = quotations.map((entry) => {
							const entryData = {
								...entry,
								capital_uuid: itemData.uuid,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
							};
							return postData.mutateAsync({
								url: `/procure/capital-vendor`,
								newData: entryData,
							});
						});
						Promise.all([...quotationsPromise]);
					}

					// * ENTRY FOR ITEMS
					if (filteredItems.length > 0) {
						const itemsPromise = filteredItems.map((entry) => {
							const entryData = {
								...entry,
								received_date: entry.is_received ? getDateTime() : null,
								capital_uuid: itemData.uuid,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
							};
							return postData.mutateAsync({
								url: `/procure/item-work-order-entry`,
								newData: entryData,
							});
						});
						Promise.all([...itemsPromise]);
					}

					// * ENTRY FOR GENERAL NOTES
					if (general_notes.length > 0) {
						const generalNotesPromise = general_notes.map((entry) => {
							const entryData = {
								...entry,
								capital_uuid: itemData.uuid,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
							};
							return postData.mutateAsync({
								url: `/procure/general-note`,
								newData: entryData,
							});
						});
						Promise.all([...generalNotesPromise]);
					}
				})
				.then(() => {
					invalidateQuery();
					invalidateCapitalDetails();
					navigate('/procurement/procure');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}

	// ? Dynamic Form

	// * ADD QUOTATIONS
	const handleAddQuotations = () => {
		appendQuotation({
			vendor_uuid: '',
			amount: 0,
			is_selected: false,
		});
	};

	// * ADD ITEMS
	const handleAddItems = () => {
		appendItems({
			item_uuid: '',
			quantity: 0,
			is_received: false,
			received_date: null,
		});
	};

	// * ADD GENERAL NOTES
	const handleAddGeneralNotes = () => {
		appendGeneralNotes({
			description: '',
			amount: 0,
		});
	};

	// * DELETE
	const [deleteItem, setDeleteItem] = useState<{
		type?: string;
		id: string;
		name: string;
	} | null>(null);

	// * REMOVE QUOTATIONS
	const handleRemoveQuotations = (index: number) => {
		if (quotationFields[index].uuid) {
			setDeleteItem({
				type: 'quotations',
				id: quotationFields[index].uuid,
				name: quotationFields[index].id,
			});
		} else {
			removeQuotation(index);
		}
	};

	// * REMOVE ITEMS
	const handleRemoveItems = (index: number) => {
		if (itemsFields[index].uuid) {
			setDeleteItem({
				type: 'items',
				id: itemsFields[index].uuid,
				name: itemsFields[index].uuid,
			});
		} else {
			removeItems(index);
		}
	};

	// * REMOVE GENERAL NOTES
	const handleRemoveGeneralNotes = (index: number) => {
		if (generalNotesFields[index].uuid) {
			setDeleteItem({
				type: 'general_notes',
				id: generalNotesFields[index].uuid,
				name: generalNotesFields[index].id,
			});
		} else {
			removeGeneralNotes(index);
		}
	};

	// * COPY QUOTATIONS
	const handleCopyQuotations = (index: number) => {
		const field = form.watch('quotations')[index];
		appendQuotation({
			vendor_uuid: field.vendor_uuid,
			amount: field.amount,
			is_selected: field.is_selected,
		});
	};

	// * COPY ITEMS
	const handleCopyItems = (index: number) => {
		const field = form.watch('items')[index];
		appendItems({
			item_uuid: field.item_uuid,
			quantity: field.quantity,
			is_received: field.is_received,
			received_date: field.received_date,
		});
	};

	// * COPY GENERAL NOTES
	const handleCopyGeneralNotes = (index: number) => {
		const field = form.watch('general_notes')[index];
		appendGeneralNotes({
			amount: field.amount,
			description: field.description,
		});
	};

	const fieldDefsQuotations = useGenerateFieldDefs({
		data: form.getValues(),
		copy: handleCopyQuotations,
		remove: handleRemoveQuotations,
		isUpdate,
		watch: form.watch,
	});

	const fieldDefsItems = useGenerateItemWorkOrder({
		data: form.getValues(),
		copy: handleCopyItems,
		remove: handleRemoveItems,
		isUpdate,
		watch: form.watch,
		set: form.setValue,
		isNew: false,
		form: form,
	});

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Update Procure' : 'Add Procure'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section
				title={`Request`}
				className='grid gap-4 lg:grid-cols-2'
				extraHeader={
					<FormField
						control={form.control}
						name='done'
						render={(props) => <CoreForm.Switch labelClassName='text-slate-100' label='Paid' {...props} />}
					/>
				}
			>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField
					control={form.control}
					name='sub_category_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Sub Category'
							placeholder='Select sub category'
							menuPortalTarget={document.body}
							options={subCategoryList!}
							{...props}
							onChange={(option) => {
								setSubCategory(option?.label || null);
								// form.setValue('sub_category_uuid', option?.value || null);
							}}
						/>
					)}
				/>

				{subCategory === 'Items' && (
					<FormField
						control={form.control}
						name='vendor_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Vendor'
								placeholder='Select vendor'
								menuPortalTarget={document.body}
								isDisabled={isUpdate}
								options={vendorList!}
								{...props}
							/>
						)}
					/>
				)}
				{/* <FormField
					control={form.control}
					name='status'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Status'
							placeholder='Select status'
							menuPortalTarget={document.body}
							options={status!}
							{...props}
						/>
					)}
				/> */}
			</CoreForm.Section>

			{subCategory !== 'Items' ? (
				<CoreForm.DynamicFields
					title='Quotations'
					extraHeader={
						<FormField
							control={form.control}
							name='is_quotation'
							render={(props) => <CoreForm.Switch labelClassName='text-slate-100' {...props} />}
						/>
					}
					form={form}
					fieldName='quotations'
					fieldDefs={fieldDefsQuotations}
					fields={quotationFields}
					{...(form.watch('is_quotation') ? { handleAdd: handleAddQuotations } : {})}
				/>
			) : (
				<CoreForm.DynamicFields
					title='Items'
					// extraHeader={
					// 	<FormField
					// 		control={form.control}
					// 		name='is_quotation'
					// 		render={(props) => <CoreForm.Switch labelClassName='text-slate-100' {...props} />}
					// 	/>
					// }
					form={form}
					fieldName='items'
					fieldDefs={fieldDefsItems}
					fields={itemsFields}
					handleAdd={handleAddItems}
					// {...(form.watch('is_quotation') ? { handleAdd: handleAddItems } : {})}
				/>
			)}

			<CoreForm.Section
				title={`Cs`}
				className='grid gap-4 lg:grid-cols-1'
				extraHeader={
					<FormField
						control={form.control}
						name='is_cs'
						render={(props) => <CoreForm.Switch label='Cs' labelClassName='text-slate-100' {...props} />}
					/>
				}
			>
				{form.watch('is_cs') && (
					<FormField
						control={form.control}
						name='cs_remarks'
						render={(props) => (
							<CoreForm.Textarea
								label='Cs Remarks'
								disabled={!(form.watch('is_cs') && form.watch('is_quotation'))}
								{...props}
							/>
						)}
					/>
				)}
			</CoreForm.Section>

			<CoreForm.Section
				title={`Monthly Meeting`}
				className='grid gap-4 lg:grid-cols-1'
				extraHeader={
					<FormField
						control={form.control}
						name='is_monthly_meeting'
						render={(props) => (
							<CoreForm.Switch label='Monthly Meeting' labelClassName='text-slate-100' {...props} />
						)}
					/>
				}
			>
				{form.watch('is_monthly_meeting') && (
					<FormField
						control={form.control}
						name='monthly_meeting_remarks'
						render={(props) => (
							<CoreForm.Textarea
								label='Monthly Meeting Remarks'
								disabled={
									!(
										form.watch('is_monthly_meeting') &&
										form.watch('is_cs') &&
										form.watch('is_quotation')
									)
								}
								{...props}
							/>
						)}
					/>
				)}
			</CoreForm.Section>

			<CoreForm.Section
				title={`Work Order`}
				className='grid gap-4 lg:grid-cols-1'
				extraHeader={
					<FormField
						control={form.control}
						name='is_work_order'
						render={(props) => (
							<CoreForm.Switch
								label='Work Order'
								labelClassName='text-slate-100'
								{...props}
								onCheckedChange={(value) => {
									if (!value) {
										form.setValue(
											'items',
											form
												.getValues('items')
												.map((item) => ({ ...item, is_received: false, received_date: null }))
										);
									}
								}}
							/>
						)}
					/>
				}
			>
				{form.watch('is_work_order') && (
					<>
						{subCategory !== 'Items' && (
							<FormField
								control={form.control}
								name='vendor_uuid'
								render={(props) => (
									<CoreForm.ReactSelect
										label='Vendor'
										options={
											vendorList?.filter((item) =>
												form
													.getValues('quotations')
													.some((quotation) => quotation.vendor_uuid === item.value)
											) || []
										}
										isDisabled={
											!(
												form.watch('is_work_order') &&
												form.watch('is_monthly_meeting') &&
												form.watch('is_cs') &&
												form.watch('is_quotation')
											)
										}
										{...props}
									/>
								)}
							/>
						)}
						<FormField
							control={form.control}
							name='work_order_remarks'
							render={(props) => (
								<CoreForm.Textarea
									label='Work Order Remarks'
									disabled={
										!(
											form.watch('is_work_order') &&
											form.watch('is_monthly_meeting') &&
											form.watch('is_cs') &&
											form.watch('is_quotation')
										)
									}
									{...props}
								/>
							)}
						/>
					</>
				)}
			</CoreForm.Section>

			<CoreForm.Section
				title={`Delivery Statement`}
				className='grid gap-4 lg:grid-cols-1'
				extraHeader={
					<FormField
						control={form.control}
						name='is_delivery_statement'
						render={(props) => (
							<CoreForm.Switch label='Delivery Statement' labelClassName='text-slate-100' {...props} />
						)}
					/>
				}
			>
				{form.watch('is_delivery_statement') && (
					<FormField
						control={form.control}
						name='delivery_statement_remarks'
						render={(props) => (
							<CoreForm.Textarea
								label='Delivery Statement Remarks'
								disabled={
									!(
										form.watch('is_delivery_statement') &&
										form.watch('is_work_order') &&
										form.watch('is_monthly_meeting') &&
										form.watch('is_cs') &&
										form.watch('is_quotation')
									)
								}
								{...props}
							/>
						)}
					/>
				)}
			</CoreForm.Section>

			<CoreForm.DynamicFields
				title='General Notes'
				form={form}
				fieldName='general_notes'
				fieldDefs={useGenerateGeneralNotes({
					data: form.getValues(),
					copy: handleCopyGeneralNotes,
					remove: handleRemoveGeneralNotes,
					isUpdate,
					isNew: false,
				})}
				fields={generalNotesFields}
				handleAdd={handleAddGeneralNotes}
			/>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url:
							deleteItem?.type === 'quotations'
								? `/procure/capital-vendor`
								: deleteItem?.type === 'general_notes'
									? `/procure/general-note`
									: `/procure/item-work-order-entry`,
						deleteData,
						invalidateQuery: invalidateCapitalDetails,
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
