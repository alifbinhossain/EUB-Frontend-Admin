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

import { useOtherVendor } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IItemTableData, IItemWorkOrderTableData } from './config/columns/columns.type';
import { useItemByVendor, useItemWordOrder, useItemWorkOrderAndEntry } from './config/query';
import { IItemWorkOrder, ITEM_WORD_ORDER_NULL, ITEM_WORD_ORDER_SCHEMA } from './config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';
import { status } from './utils';

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

	const { invalidateQuery } = useItemWordOrder<IItemWorkOrderTableData[]>();
	const { data: vendorList } = useOtherVendor<IFormSelectOption[]>();

	const form = useRHF(ITEM_WORD_ORDER_SCHEMA, ITEM_WORD_ORDER_NULL);
	const { fields, remove } = useFieldArray({
		control: form.control,
		name: 'item_work_order_entry',
	});
	const { fields: newFields } = useFieldArray({
		control: form.control,
		name: 'new_item_work_order_entry',
	});

	const { data: itemData, invalidateQuery: invalidateQueryItemByVendor } = useItemByVendor<IItemTableData[]>(
		form.watch('vendor_uuid') as string
	);

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			// Reset form values
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Set item_work_order_entry when itemData is updated
	useEffect(() => {
		if (itemData && !isUpdate) {
			const item_work_order_entry = itemData.map((item) => ({
				item_uuid: item.item_uuid,
				name: item.name,
				quantity: 0,
				item_work_order_uuid: '',
				unit_price: item.vendor_price,
				is_received: false,
			}));

			form.setValue('item_work_order_entry', item_work_order_entry);
		}

		if (itemData && isUpdate) {
			const new_item_work_order_entry = itemData
				.filter(
					(entry) =>
						!form.getValues('item_work_order_entry').find((item) => item.item_uuid === entry.item_uuid)
				)
				.map((entry) => ({
					item_uuid: entry?.item_uuid,
					name: entry?.name,
					quantity: 0,
					item_work_order_uuid: '',
					unit_price: entry?.vendor_price,
					is_received: false,
				}));
			form.setValue('new_item_work_order_entry', new_item_work_order_entry);
			console.log(form.getValues());
		}
	}, [itemData]);

	// Submit handler
	async function onSubmit(values: IItemWorkOrder) {
		if (isUpdate) {
			// UPDATE ITEM
			const { item_work_order_entry, new_item_work_order_entry, ...rest } = values;
			const itemUpdatedData = {
				...rest,
				updated_at: getDateTime(),
			};

			updateData
				.mutateAsync({
					url: `/procure/item-work-order/${uuid}`,
					updatedData: itemUpdatedData,
				})
				.then(() => {
					const entryUpdatePromise = item_work_order_entry.map((entry) => {
						if (entry.uuid) {
							const entryUpdateData = {
								...entry,
								updatedData: itemUpdatedData,
							};
							return updateData.mutateAsync({
								url: `/procure/item-work-order-entry/${entry.uuid}`,
								updatedData: entryUpdateData,
							});
						} else {
							const entryData = {
								...entry,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
								item_uuid: uuid,
							};

							return postData.mutateAsync({
								url: `/procure/item-work-order-entry`,
								newData: entryData,
							});
						}
					});

					const newEntryUpdatePromise = new_item_work_order_entry
						.filter((entry) => entry.quantity > 0)
						.map((entry) => {
							const entryData = {
								...entry,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
								item_work_order_uuid: uuid,
							};

							return postData.mutateAsync({
								url: `/procure/item-work-order-entry`,
								newData: entryData,
							});
						});

					Promise.all([...entryUpdatePromise, ...newEntryUpdatePromise]);
				})
				.then(() => {
					invalidateQuery();
					invalidateQueryWorkOrderAndEntry();
					navigate('/procurement/item-work-order');
				})
				.catch((error) => {
					console.error('Error updating news:', error);
				});
		} else {
			// ADD NEW ITEM
			const { item_work_order_entry, ...rest } = values;
			const itemData = {
				...rest,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			};

			if (item_work_order_entry.filter((entry) => entry.quantity > 0).length === 0) {
				toast.warning('please add at least one item entry');
				return;
			}

			postData
				.mutateAsync({
					url: '/procure/item-work-order',
					newData: itemData,
				})
				.then(() => {
					const entryPromise = item_work_order_entry
						.filter((entry) => entry.quantity > 0)
						.map((entry) => {
							const entryData = {
								...entry,
								item_work_order_uuid: itemData.uuid,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
							};

							return postData.mutateAsync({
								url: `/procure/item-work-order-entry`,
								newData: entryData,
							});
						});

					Promise.all([...entryPromise]);
				})
				.then(() => {
					invalidateQuery();
					navigate('/procurement/item-work-order');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleRemove = (index: number) => {
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: fields[index].uuid,
			});
		} else {
			remove(index);
		}
	};

	// of conditional dynamic fields we need to generate fieldDefs in a variable
	const fieldDefs = useGenerateFieldDefs({
		remove: handleRemove,
		isUpdate,
		isNew: true,
	});

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Item Work Order' : 'Add Item Work Order'}
			form={form}
			onSubmit={onSubmit}
		>
			<CoreForm.Section title={`Item Work Order`}>
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
				<FormField
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
				/>

				<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			</CoreForm.Section>
			<CoreForm.DynamicFields
				title='Item Work Order Entry'
				form={form}
				fieldName='item_work_order_entry'
				fieldDefs={useGenerateFieldDefs({
					remove: handleRemove,
					isUpdate,
					isNew: false,
				})}
				fields={fields}
			/>
			{isUpdate && (
				<CoreForm.DynamicFields
					title='New Item Work Order Entry'
					form={form}
					fieldName='new_item_work_order_entry'
					fieldDefs={fieldDefs}
					fields={newFields}
				/>
			)}
			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/procure/item-work-order-entry`,
						deleteData,
						invalidateQuery: invalidateQueryWorkOrderAndEntry,
						invalidateQueries: [
							invalidateQuery,
							invalidateQueryItemByVendor,
							invalidateQueryWorkOrderAndEntry,
						],
						onClose: () => {
							form.setValue(
								'item_work_order_entry',
								form.getValues('item_work_order_entry').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
