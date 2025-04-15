import { Suspense, useEffect, useState } from 'react';
import { divide } from 'lodash';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
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
import { departments } from './utils';

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
		invalidateQuery: invalidateQueryRequisition,
	} = useRequisitionAndItemByUUID(uuid as string);
	const { invalidateQuery } = useRequisition<IRequisitionTableData[]>();
	const { data: internalCostCenter, invalidateQuery: invalidateQueryInternalCostCenter } =
		useOtherInternalCostCenter<IFormSelectOption[]>();

	const form = useRHF(REQUISITION_SCHEMA, REQUISITION_NULL);
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'item_requisition',
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
			const { item_requisition, ...rest } = values;
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
			const { item_requisition, ...rest } = values;
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
					const entryPromise = item_requisition.map((entry) => {
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

					Promise.all([...entryPromise]);
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

		append({
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
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		// TODO: Update fields ⬇️
		const field = form.watch('item_requisition')[index];
		append({
			item_uuid: field.item_uuid,
			req_quantity: field.req_quantity,
			provided_quantity: field.provided_quantity,
			remarks: field.remarks,
		});
	};

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Requisition' : 'Add Requisition'}
			form={form}
			onSubmit={onSubmit}
		>
			<CoreForm.Section title={`Requisition`}>
				<FormField
					control={form.control}
					name='internal_cost_center_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Internal Cost Center'
							placeholder='Select Internal Cost Center'
							options={internalCostCenter!}
							isDisabled={true}
							{...props}
						/>
					)}
				/>

				<FormField
					control={form.control}
					name='department'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Department'
							placeholder='Select Department'
							options={departments}
							isDisabled={true}
							{...props}
						/>
					)}
				/>
				<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			</CoreForm.Section>
			<CoreForm.DynamicFields
				title='Item Requisition'
				form={form}
				fieldName='item_requisition'
				fieldDefs={useGenerateFieldDefs({
					data: form.getValues(),
					remove: handleRemove,
					isUpdate,
					provider: true,
				})}
				handleAdd={handleAdd}
				fields={fields}
			/>
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
