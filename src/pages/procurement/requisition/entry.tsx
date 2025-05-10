import { Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { ShowLocalToast } from '@/components/others/toast';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import { useOtherInternalCostCenter } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IRequisitionTableData } from './config/columns/columns.type';
import { useRequisition, useRequisitionAndItemByUUID } from './config/query';
import { IRequisition, REQUISITION_NULL, REQUISITION_SCHEMA } from './config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();

	const { user } = useAuth();
	const pageAccess = useAccess('procurement__requisition') as string[];
	const receivedAccess = pageAccess.includes('click_received');
	const overrideReceivedAccess = pageAccess.includes('click_received_override');
	const showAll = pageAccess.includes('show_all');
	const {
		data,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateQueryRequisition,
	} = useRequisitionAndItemByUUID(uuid as string);

	const { invalidateQuery } = useRequisition<IRequisitionTableData[]>(showAll, user?.uuid);
	const { data: internalCostCenter, invalidateQuery: invalidateQueryInternalCostCenter } =
		useOtherInternalCostCenter<IFormSelectOption[]>();

	const form = useRHF(REQUISITION_SCHEMA, REQUISITION_NULL);
	const { fields } = useFieldArray({
		control: form.control,
		name: 'item_requisition',
	});
	const {
		fields: newFields,
		append: newAppend,
		remove: newRemove,
	} = useFieldArray({
		control: form.control,
		name: 'new_item_requisition',
	});
	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IRequisition) {
		if (isUpdate) {
			// UPDATE ITEM
			const { item_requisition: _item_requisition, new_item_requisition, ...rest } = values;
			let item_requisition = _item_requisition;
			item_requisition = item_requisition.concat(new_item_requisition || []);
			const itemUpdatedData = {
				...rest,
				updated_at: getDateTime(),
			};

			updateData
				.mutateAsync({
					url: `/procure/requisition/${uuid}`,
					updatedData: itemUpdatedData,
				})
				.then(() => {
					const entryUpdatePromise = item_requisition.map((entry) => {
						if (entry.uuid) {
							const entryUpdateData = {
								...entry,
								updatedData: itemUpdatedData,
							};
							return updateData.mutateAsync({
								url: `/procure/item-requisition/${entry.uuid}`,
								updatedData: entryUpdateData,
							});
						} else {
							const entryData = {
								...entry,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
								requisition_uuid: uuid,
							};

							return postData.mutateAsync({
								url: `/procure/item-requisition`,
								newData: entryData,
							});
						}
					});

					Promise.all(entryUpdatePromise);
				})
				.then(() => {
					invalidateQuery();
					invalidateQueryRequisition();
					invalidateQueryInternalCostCenter();
					navigate('/procurement/requisition');
				})
				.catch((error) => {
					console.error('Error updating news:', error);
				});
		} else {
			// ADD NEW ITEM
			const { new_item_requisition, ...rest } = values;
			const itemData = {
				...rest,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			};

			postData
				.mutateAsync({
					url: '/procure/requisition',
					newData: itemData,
				})
				.then(() => {
					const entryPromise = new_item_requisition?.map((entry) => {
						const entryData = {
							...entry,
							created_at: getDateTime(),
							created_by: user?.uuid,
							uuid: nanoid(),
							requisition_uuid: itemData.uuid,
						};

						return postData.mutateAsync({
							url: `/procure/item-requisition`,
							newData: entryData,
						});
					});

					Promise.all(entryPromise ?? []);
				})
				.then(() => {
					invalidateQuery();
					invalidateQueryRequisition();
					invalidateQueryInternalCostCenter();
					navigate('/procurement/requisition');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}

	const handleAdd = () => {
		// TODO: Update field names
		if (form.watch('is_received')) {
			ShowLocalToast({
				toastType: 'error',
				message: 'You cannot add new item if the requisition is received',
			});
			return;
		}

		newAppend({
			item_uuid: '',
			req_quantity: 0,
			provided_quantity: 0,
			remarks: '',
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleRemove = (index: number) => {
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid, // TODO: Update field id
				name: fields[index].id, // TODO: Update field name
			});
		}
	};
	const handleNewRemove = (index: number) => {
		newRemove(index);
	};

	const fieldDef = useGenerateFieldDefs({
		data: form.getValues(),

		remove: handleRemove,
		request: true,
		isUpdate,
		isNew: false,
		watch: form.watch,
	});
	const newFieldDef = useGenerateFieldDefs({
		data: form.getValues(),
		remove: handleNewRemove,
		request: true,
		isUpdate,
		watch: form.watch,
	});

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Requisition' : 'Add Requisition'}
			form={form}
			onSubmit={onSubmit}
		>
			<CoreForm.Section
				title={isUpdate ? 'Edit Requisition' : 'Add Requisition'}
				extraHeader={
					<div className='flex gap-4 text-white'>
						<FormField
							control={form.control}
							name='is_received'
							render={(props) => (
								<CoreForm.Switch
									label='Received'
									onCheckedChange={(value: boolean) => {
										form.setValue('is_received', value);
										if (value) {
											form.setValue('received_date', getDateTime(), { shouldDirty: true });
										} else {
											form.setValue('received_date', null, { shouldDirty: true });
											form.setValue('is_received', false, { shouldDirty: true });
										}
									}}
									disabled={
										receivedAccess &&
										form.watch('is_received') &&
										!overrideReceivedAccess &&
										!isUpdate
									}
									{...props}
								/>
							)}
						/>
					</div>
				}
			>
				<FormField
					control={form.control}
					name='received_date'
					render={(props) => <CoreForm.DatePicker disabled={true} placeholder='Received Date' {...props} />}
				/>
				<FormField
					control={form.control}
					name='remarks'
					render={(props) => <CoreForm.Textarea disabled={form.watch('is_received')} {...props} />}
				/>
			</CoreForm.Section>
			{isUpdate && (
				<CoreForm.DynamicFields
					title='Item Requisition'
					form={form}
					fieldName='item_requisition'
					fieldDefs={fieldDef}
					fields={fields}
				/>
			)}
			{
				<CoreForm.DynamicFields
					title='New Item Requisition'
					form={form}
					fieldName='new_item_requisition'
					fieldDefs={newFieldDef}
					handleAdd={handleAdd}
					fields={newFields}
				/>
			}
			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/procure/item-requisition`, // TODO: Update url
						deleteData,
						onClose: () => {
							form.setValue(
								'item_requisition', // TODO: Update field name
								form
									.getValues('item_requisition') // TODO: Update field name
									.filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
