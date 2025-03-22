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

import { IItemTableData, IServiceTableData } from './config/columns/columns.type';
import { useItemByVendor, useItemWorkOrderAndEntry, useService } from './config/query';
import { IService, SERVICE_NULL, SERVICE_SCHEMA } from './config/schema';
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
		invalidateQuery: invalidateQueryWorkOrderAndEntry,
	} = useItemWorkOrderAndEntry(uuid as string);

	const { invalidateQuery } = useService<IServiceTableData[]>();
	const { data: vendorList } = useOtherVendor<IFormSelectOption[]>();
	const { data: subCategoryList } = useOtherSubCategory<IFormSelectOption[]>();

	const form = useRHF(SERVICE_SCHEMA, SERVICE_NULL);

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

	// Submit handler
	async function onSubmit(values: IService) {
		// if (isUpdate) {
		// 	// UPDATE ITEM
		// 	const { item_work_order_entry, new_item_work_order_entry, ...rest } = values;
		// 	const itemUpdatedData = {
		// 		...rest,
		// 		updated_at: getDateTime(),
		// 	};
		// 	updateData
		// 		.mutateAsync({
		// 			url: `/procure/item-work-order/${uuid}`,
		// 			updatedData: itemUpdatedData,
		// 		})
		// 		.then(() => {
		// 			const entryUpdatePromise = item_work_order_entry.map((entry) => {
		// 				if (entry.uuid) {
		// 					const entryUpdateData = {
		// 						...entry,
		// 						updatedData: itemUpdatedData,
		// 					};
		// 					return updateData.mutateAsync({
		// 						url: `/procure/item-work-order-entry/${entry.uuid}`,
		// 						updatedData: entryUpdateData,
		// 					});
		// 				} else {
		// 					const entryData = {
		// 						...entry,
		// 						created_at: getDateTime(),
		// 						created_by: user?.uuid,
		// 						uuid: nanoid(),
		// 						item_uuid: uuid,
		// 					};
		// 					return postData.mutateAsync({
		// 						url: `/procure/item-work-order-entry`,
		// 						newData: entryData,
		// 					});
		// 				}
		// 			});
		// 			const newEntryUpdatePromise = new_item_work_order_entry
		// 				.filter((entry) => entry.quantity > 0)
		// 				.map((entry) => {
		// 					const entryData = {
		// 						...entry,
		// 						created_at: getDateTime(),
		// 						created_by: user?.uuid,
		// 						uuid: nanoid(),
		// 						item_work_order_uuid: uuid,
		// 					};
		// 					return postData.mutateAsync({
		// 						url: `/procure/item-work-order-entry`,
		// 						newData: entryData,
		// 					});
		// 				});
		// 			Promise.all([...entryUpdatePromise, ...newEntryUpdatePromise]);
		// 		})
		// 		.then(() => {
		// 			invalidateQuery();
		// 			invalidateQueryWorkOrderAndEntry();
		// 			navigate('/procurement/item-work-order');
		// 		})
		// 		.catch((error) => {
		// 			console.error('Error updating news:', error);
		// 		});
		// } else {
		// 	// ADD NEW ITEM
		// 	const { item_work_order_entry, ...rest } = values;
		// 	const itemData = {
		// 		...rest,
		// 		created_at: getDateTime(),
		// 		created_by: user?.uuid,
		// 		uuid: nanoid(),
		// 	};
		// 	if (item_work_order_entry.filter((entry) => entry.quantity > 0).length === 0) {
		// 		toast.warning('please add at least one item entry');
		// 		return;
		// 	}
		// 	postData
		// 		.mutateAsync({
		// 			url: '/procure/item-work-order',
		// 			newData: itemData,
		// 		})
		// 		.then(() => {
		// 			const entryPromise = item_work_order_entry
		// 				.filter((entry) => entry.quantity > 0)
		// 				.map((entry) => {
		// 					const entryData = {
		// 						...entry,
		// 						item_work_order_uuid: itemData.uuid,
		// 						created_at: getDateTime(),
		// 						created_by: user?.uuid,
		// 						uuid: nanoid(),
		// 					};
		// 					return postData.mutateAsync({
		// 						url: `/procure/item-work-order-entry`,
		// 						newData: entryData,
		// 					});
		// 				});
		// 			Promise.all([...entryPromise]);
		// 		})
		// 		.then(() => {
		// 			invalidateQuery();
		// 			navigate('/procurement/item-work-order');
		// 		})
		// 		.catch((error) => {
		// 			console.error('Error adding news:', error);
		// 		});
		// }
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
			vendor_uuid: '',
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
			vendor_uuid: field.vendor_uuid,
			amount: field.amount,
			description: field.description,
		});
	};

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Update Service' : 'Add Service'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section title={`Main`} className='grid gap-4 lg:grid-cols-2'>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField
					control={form.control}
					name='sub_category_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Status'
							placeholder='Select status'
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
					isNew: false,
				})}
				fields={quotationFields}
				handleAdd={handleAddQuotations}
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
				<FormField
					control={form.control}
					name='cs_remarks'
					render={(props) => <CoreForm.Textarea label='Cs Remarks' {...props} />}
				/>
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
				<FormField
					control={form.control}
					name='monthly_meeting_remarks'
					render={(props) => <CoreForm.Textarea label='Monthly Meeting Remarks' {...props} />}
				/>
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
				<FormField
					control={form.control}
					name='work_order_remarks'
					render={(props) => <CoreForm.Textarea label='Work Order Remarks' {...props} />}
				/>
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
				<FormField
					control={form.control}
					name='delivery_statement_remarks'
					render={(props) => <CoreForm.Textarea label='Delivery Statement Remarks' {...props} />}
				/>
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
								? `/procure/quotations`
								: `/procure/item-work-order-entry`,
						deleteData,
						// invalidateQuery: invalidateQueryWorkOrderAndEntry,
						// invalidateQueries: [
						// 	invalidateQuery,
						// 	invalidateQueryItemByVendor,
						// 	invalidateQueryWorkOrderAndEntry,
						// ],
						// onClose: () => {
						// 	form.setValue(
						// 		'item_work_order_entry',
						// 		form.getValues('item_work_order_entry').filter((item) => item.uuid !== deleteItem?.id)
						// 	);
						// },
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
