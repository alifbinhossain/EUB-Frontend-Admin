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

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();

	const { user } = useAuth();
	const {
		data,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateCapitalDetails,
	} = useCapitalDetails(uuid as string);

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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	console.log(form.formState.errors);
	// Submit handler
	async function onSubmit(values: ICapital) {
		if (isUpdate) {
			// UPDATE ITEM
			const { quotations, general_notes, ...rest } = values;

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
			const { quotations, general_notes, ...rest } = values;

			const itemData = {
				...rest,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			};

			console.log('Main', itemData);
			console.log('Quotations', quotations);
			console.log('GN', general_notes);

			postData
				.mutateAsync({
					url: '/procure/procure',
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

	// * COPY GENERAL NOTES
	const handleCopyGeneralNotes = (index: number) => {
		const field = form.watch('general_notes')[index];
		appendGeneralNotes({
			amount: field.amount,
			description: field.description,
		});
	};

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Update Procure' : 'Add Procure'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section
				title={`Main`}
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
						/>
					)}
				/>
			</CoreForm.Section>

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
				fieldDefs={useGenerateFieldDefs({
					data: form.getValues(),
					copy: handleCopyQuotations,
					remove: handleRemoveQuotations,
					isUpdate,
					watch: form.watch,
				})}
				fields={quotationFields}
				{...(form.watch('is_quotation') ? { handleAdd: handleAddQuotations } : {})}
			/>

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
							<CoreForm.Switch label='Work Order' labelClassName='text-slate-100' {...props} />
						)}
					/>
				}
			>
				{form.watch('is_work_order') && (
					<>
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
						url: deleteItem?.type === 'quotations' ? `/procure/capital-vendor` : `/procure/general-note`,
						deleteData,
						invalidateQuery: invalidateCapitalDetails,
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
