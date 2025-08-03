import { Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { ShowLocalToast } from '@/components/others/toast';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import { useOtherBill, useOtherRequestedItems, useOtherVendor } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { useItem } from '../item/config/query';
import { IProcureStoreTableData } from './config/columns/columns.type';
import { useItemWorkOrder, useItemWorkOrderByDetails } from './config/query';
import { IProcureRequest, PROCURE_REQUEST_NULL, PROCURE_REQUEST_SCHEMA } from './config/schema';
import ItemRequestTable from './item-request-table';
import useGenerateItemWorkOrder from './useGenerateItemWorkOrder';
import { ICustomItemSelectOptions } from './utils';

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();

	const { user } = useAuth();
	const {
		data,
		updateData,
		deleteData,
		imagePostData,
		imageUpdateData,
		invalidateQuery: invalidateCapitalDetails,
	} = useItemWorkOrderByDetails<IProcureStoreTableData>(uuid as string);

	const { invalidateQuery } = useItemWorkOrder<IProcureStoreTableData[]>();
	const { data: vendorList } = useOtherVendor<IFormSelectOption[]>();
	const { data: billList } = useOtherBill<IFormSelectOption[]>();
	const { data: itemList } = useOtherRequestedItems<ICustomItemSelectOptions[]>();
	const { invalidateQuery: invalidQueryItem } = useItem();

	const form = useRHF(PROCURE_REQUEST_SCHEMA, PROCURE_REQUEST_NULL);

	const {
		fields: itemsFields,
		append: appendItems,
		remove: removeItems,
	} = useFieldArray({
		control: form.control,
		name: 'item_work_order_entry',
	});

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			// Reset form values
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);
	// * DELETE
	const [deleteItem, setDeleteItem] = useState<{
		type?: string;
		id: string;
		name: string;
	} | null>(null);
	// * ADD ITEMS
	const handleAddItems = () => {
		appendItems({
			item_uuid: '',
			request_quantity: 0,
			provided_quantity: 0,
		});
	};
	// * COPY ITEMS
	const handleCopyItems = (index: number) => {
		const field = form.watch('item_work_order_entry')[index];
		appendItems({
			item_uuid: field?.item_uuid,
			request_quantity: field?.request_quantity,
			provided_quantity: field?.provided_quantity,
		});
	};
	// * REMOVE ITEMS
	const handleRemoveItems = (index: number) => {
		if (itemsFields[index].uuid) {
			const removeData = {
				uuid: itemsFields[index].uuid,
				item_work_order_uuid: null,
				updated_at: getDateTime(),
			};
			updateData.mutateAsync({
				url: `/procure/item-work-order-entry/${itemsFields[index].uuid}`,
				updatedData: removeData,
			});
		} else {
			removeItems(index);
		}
	};

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
	const totalItemAmount = form.watch('item_work_order_entry')?.reduce((acc, curr) => {
		acc += Number(curr.provided_quantity) * Number(curr.unit_price);
		return acc;
	}, 0);
	async function onSubmit(values: IProcureRequest) {
		const { item_work_order_entry, ...rest } = values;
		if (item_work_order_entry.length === 0) {
			return ShowLocalToast({
				toastType: 'error',
				message: 'Please add at least one item',
			});
		}

		const formData = Formdata(rest);

		// Remove fields with null value from formData
		const formFields = [
			'quotation_file',
			'work_order_file',
			'delivery_statement_file',
			'bill_uuid',

			'done_date',
			'quotation_date',
			'cs_date',
			'monthly_meeting_date',
			'work_order_date',
			'delivery_statement_date',
			'monthly_meeting_schedule_date',

			'cs_remarks',
			'monthly_meeting_remarks',
			'work_order_remarks',
			'vendor_uuid',
			'delivery_statement_remarks',
		];
		formFields.forEach((field) => {
			if (values[field as keyof typeof values] == null) {
				formData.delete(field);
			}
		});

		if (isUpdate) {
			// UPDATE ITEM
			formData.append('updated_at', getDateTime());

			imageUpdateData
				.mutateAsync({
					url: `/procure/item-work-order/${uuid}`,
					updatedData: formData,
				})
				.then(() => {
					// * UPDATE FOR ITEMS

					const itemsPromise = item_work_order_entry?.map((entry, index) => {
						const entryUpdateData = {
							...entry,
							index: index + 1,
							item_uuid: itemList?.find((item) => item.value === entry.item_uuid)?.item_uuid,
							item_work_order_uuid: uuid,
							updated_at: getDateTime(),
						};
						return updateData.mutateAsync({
							url: `/procure/item-work-order-entry/${entryUpdateData.uuid}`,
							updatedData: entryUpdateData,
						});
					});
					Promise.all([...itemsPromise]);
				})
				.then(() => {
					invalidateQuery();
					invalidateQuery();
					invalidQueryItem();
					invalidQueryItem();
					invalidateCapitalDetails();
					navigate('/procurement/procure-store');
				})
				.catch((error) => {
					console.error('Error updating news:', error);
				});
		} else {
			// ADD NEW ITEM
			const new_uuid = nanoid();

			formData.append('created_at', getDateTime());
			formData.append('created_by', user?.uuid || '');
			formData.append('uuid', new_uuid);

			imagePostData
				.mutateAsync({
					url: '/procure/item-work-order',
					newData: formData,
				})
				.then(() => {
					// * ENTRY FOR ITEMS

					const itemsPromise = item_work_order_entry?.map((entry, index) => {
						const entryData = {
							...entry,
							index: index + 1,
							item_uuid: itemList?.find((item) => item.value === entry.item_uuid)?.item_uuid,
							item_work_order_uuid: new_uuid,
							updated_at: getDateTime(),
						};
						return updateData.mutateAsync({
							url: `/procure/item-work-order-entry/${entryData.uuid}`,
							updatedData: entryData,
						});
					});
					Promise.all([...itemsPromise]);
				})
				.then(() => {
					invalidateQuery();
					invalidateQuery();
					invalidQueryItem();
					invalidQueryItem();
					invalidateCapitalDetails();
					navigate('/procurement/procure-store');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}
	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Update Procure(Store)' : 'Add Procure(Store)'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='grid grid-cols-2 gap-4'>
				<CoreForm.Section
					title={`Work Order`}
					className='grid gap-4 lg:grid-cols-1'
					extraHeader={
						<div className='flex items-center justify-center gap-4'>
							<FormField
								control={form.control}
								name='done_date'
								render={(props) => (
									<CoreForm.DatePicker disableLabel placeholder='Done Date' disabled {...props} />
								)}
							/>
							<FormField
								control={form.control}
								name='done'
								render={(props) => (
									<CoreForm.Switch
										labelClassName='text-slate-100'
										label='Done'
										onCheckedChange={(e) => {
											if (e) {
												form.setValue('done_date', getDateTime());
											} else {
												form.setValue('done_date', null);
											}
										}}
										{...props}
									/>
								)}
							/>
						</div>
					}
				>
					<div className='grid grid-cols-3 gap-4'>
						<FormField
							control={form.control}
							name='vendor_uuid'
							render={(props) => (
								<CoreForm.ReactSelect
									label='Vendor'
									menuPortalTarget={document.body}
									options={vendorList!}
									isDisabled={data?.is_delivery_statement || data?.done}
									{...props}
								/>
							)}
						/>

						<FormField
							control={form.control}
							name='estimated_date'
							render={(props) => (
								<CoreForm.DatePicker
									label='Estimate Delivery'
									placeholder='Estimate Delivery'
									disabled={data?.done}
									{...props}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name='bill_uuid'
							render={(props) => (
								<CoreForm.ReactSelect
									label='Bill'
									options={billList!}
									isDisabled={true}
									menuPortalTarget={document.body}
									{...props}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name='subject'
							render={(props) => <CoreForm.Textarea disabled={data?.done} label='Subject' {...props} />}
						/>
						<FormField
							control={form.control}
							name='work_order_remarks'
							render={(props) => <CoreForm.Textarea disabled={data?.done} label='Remarks' {...props} />}
						/>

						<FormField
							control={form.control}
							name='work_order_file'
							render={(props) => (
								<CoreForm.FileUpload
									label='File'
									fileType='document'
									errorText='File must be less than 10MB and of type pdf, doc, docx'
									isUpdate={isUpdate}
									disabled={data?.done}
									small={true}
									options={{
										maxSize: 10000000,
									}}
									{...props}
								/>
							)}
						/>
					</div>
				</CoreForm.Section>

				<div className='rounded-md border bg-slate-100 p-2'>
					<ItemRequestTable />
				</div>
			</div>
			<CoreForm.DynamicFields
				title='Items Work Order'
				form={form}
				fieldName='item_work_order_entry'
				fieldDefs={fieldDefsItems}
				fields={itemsFields}
				handleAdd={data?.is_delivery_statement ? undefined : handleAddItems}
			>
				<tr>
					<td className='border-t text-right font-semibold' colSpan={5}>
						Grand Total:
					</td>

					<td className='border-t px-3 py-2'>{totalItemAmount}</td>
					<td className='border-t px-3 py-2'></td>
				</tr>
			</CoreForm.DynamicFields>
			<CoreForm.Section
				title={`Delivery Statement`}
				className='grid gap-4 lg:grid-cols-1'
				extraHeader={
					<div className='flex items-center justify-center gap-4'>
						<FormField
							control={form.control}
							name='delivery_statement_date'
							render={(props) => (
								<CoreForm.DatePicker
									disableLabel
									placeholder='Delivery Statement Date'
									disabled
									{...props}
								/>
							)}
						/>

						<FormField
							control={form.control}
							name='is_delivery_statement'
							render={(props) => (
								<CoreForm.Switch
									label='Delivery Statement'
									labelClassName='text-slate-100'
									disabled={data?.done}
									onCheckedChange={(e) => {
										if (e) {
											form.setValue('delivery_statement_date', getDateTime());
										} else {
											form.setValue('delivery_statement_date', null);
										}
									}}
									{...props}
								/>
							)}
						/>
					</div>
				}
			>
				{form.watch('is_delivery_statement') && (
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='delivery_statement_remarks'
							render={(props) => <CoreForm.Textarea label='Remarks' disabled={data?.done} {...props} />}
						/>
						<FormField
							control={form.control}
							name='delivery_statement_file'
							render={(props) => (
								<CoreForm.FileUpload
									label='File'
									fileType='document'
									errorText='File must be less than 10MB and of type pdf, doc, docx'
									isUpdate={isUpdate}
									disabled={data?.done}
									options={{
										maxSize: 10000000,
									}}
									small={true}
									{...props}
								/>
							)}
						/>
					</div>
				)}
			</CoreForm.Section>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/procure/item-work-order-entry`,
						deleteData,
						invalidateQuery: invalidateCapitalDetails,
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
