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
import { formatDate } from '@/utils/formatDate';

import { IItemTableData } from '../item/config/columns/columns.type';
import { useItem } from '../item/config/query';
import { IItemWorkOrderTableData } from './config/columns/columns.type';
import { useItemWordOrder, useItemWorkOrderAndEntry } from './config/query';
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

	const { invalidateQuery: invalidateQueryItem } = useItem<IItemTableData[]>();
	const { invalidateQuery } = useItemWordOrder<IItemWorkOrderTableData[]>();
	const { data: vendorList } = useOtherVendor<IFormSelectOption[]>();

	const form = useRHF(ITEM_WORD_ORDER_SCHEMA, ITEM_WORD_ORDER_NULL);
	const { fields, remove, append } = useFieldArray({
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

	// Submit handler
	async function onSubmit(values: IItemWorkOrder) {
		if (isUpdate) {
			// UPDATE ITEM
			const { item_work_order_entry, ...rest } = values;
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
					const entryUpdatePromise = item_work_order_entry.map((entry, index) => {
						if (entry.uuid) {
							const entryUpdateData = {
								...entry,
								received_date:
									form.watch(`item_work_order_entry.${index}.received_date`) !==
									(data as IItemWorkOrder)?.item_work_order_entry[index]?.received_date
										? form.watch(`item_work_order_entry.${index}.is_received`)
											? getDateTime()
											: undefined
										: formatDate(
												new Date(
													(data as IItemWorkOrder)?.item_work_order_entry[index]
														?.received_date as string
												)
											),
								updatedData: itemUpdatedData,
							};
							return updateData.mutateAsync({
								url: `/procure/item-work-order-entry/${entry.uuid}`,
								updatedData: entryUpdateData,
							});
						} else {
							const entryData = {
								...entry,
								received_date: form.watch(`item_work_order_entry.${index}.is_received`)
									? getDateTime()
									: undefined,
								item_work_order_uuid: uuid,
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

					Promise.all([...entryUpdatePromise]);
				})
				.then(() => {
					invalidateQuery();
					invalidateQueryItem();
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
					const entryPromise = item_work_order_entry.map((entry, index) => {
						const entryData = {
							...entry,
							received_date: form.watch(`item_work_order_entry.${index}.is_received`)
								? getDateTime()
								: null,
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
					invalidateQueryItem();
					invalidateQueryWorkOrderAndEntry();
					navigate('/procurement/item-work-order');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}

	const handleAdd = () => {
		append({
			item_uuid: '',
			quantity: 0,
			is_received: false,
		});
	};

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

	// Copy Handler
	const handleCopy = (index: number) => {
		const field = form.watch('item_work_order_entry')[index];
		append({
			item_uuid: field.item_uuid,
			quantity: field.quantity,
			is_received: field.is_received,
		});
	};

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
					watch: form.watch,
					set: form.setValue,
					remove: handleRemove,
					copy: handleCopy,
					isUpdate,
					isNew: false,
					data: form.getValues(),
					form: form,
				})}
				fields={fields}
				handleAdd={handleAdd}
			/>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/procure/item-work-order-entry`,
						deleteData,
						invalidateQuery: invalidateQueryWorkOrderAndEntry,
						invalidateQueries: [invalidateQuery, invalidateQueryWorkOrderAndEntry, invalidateQueryItem],
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
