import { Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal, DeleteModal } from '@core/modal';

import { useOtherPurchaseCostCenter, useOtherSubPurchaseCostCenter } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IItemTableData } from './config/columns/columns.type';
import { useItem, useItemAndVendorByUUID } from './config/query';
import { IItem, ITEM_NULL, ITEM_SCHEMA } from './config/schema';
import { IItemAddOrUpdateProps } from './config/types';
import useGenerateFieldDefs from './useGenerateFieldDefs';
import { stores } from './utils';

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
		invalidateQuery: invalidateQueryItem,
	} = useItemAndVendorByUUID(uuid as string);
	const { invalidateQuery } = useItem<IItemTableData[]>();
	const { data: purchases } = useOtherPurchaseCostCenter<IFormSelectOption[]>();

	const form = useRHF(ITEM_SCHEMA, ITEM_NULL);
	const { data: subPurchases } = useOtherSubPurchaseCostCenter<IFormSelectOption[]>(
		`?purchase_cost_center_uuid=${form.watch('purchase_cost_center_uuid')}`
	);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'vendors',
	});

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IItem) {
		if (isUpdate) {
			// UPDATE ITEM
			const { vendors, ...rest } = values;
			const itemUpdatedData = {
				...rest,
				updated_at: getDateTime(),
			};

			updateData
				.mutateAsync({
					url: `/procure/item/${uuid}`,
					updatedData: itemUpdatedData,
				})
				.then(() => {
					const entryUpdatePromise = vendors.map((entry) => {
						if (entry.uuid) {
							const entryUpdateData = {
								...entry,
								updatedData: itemUpdatedData,
							};
							return updateData.mutateAsync({
								url: `/procure/item-vendor/${entry.uuid}`,
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
								url: `/procure/item-vendor`,
								newData: entryData,
							});
						}
					});

					Promise.all(entryUpdatePromise);
				})
				.then(() => {
					invalidateQuery();
					invalidateQueryItem();
					navigate('/procurement/item');
				})
				.catch((error) => {
					console.error('Error updating news:', error);
				});
		} else {
			// ADD NEW ITEM
			const { vendors, ...rest } = values;
			const itemData = {
				...rest,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			};

			postData
				.mutateAsync({
					url: '/procure/item',
					newData: itemData,
				})
				.then(() => {
					const entryPromise = vendors.map((entry) => {
						const entryData = {
							...entry,
							created_at: getDateTime(),
							created_by: user?.uuid,
							uuid: nanoid(),
							item_uuid: itemData.uuid,
						};

						return postData.mutateAsync({
							url: `/procure/item-vendor`,
							newData: entryData,
						});
					});

					Promise.all([...entryPromise]);
				})
				.then(() => {
					invalidateQuery();
					navigate('/procurement/item');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}

	const handleAdd = () => {
		// TODO: Update field names

		append({
			// image: new File([''], 'filename'),
			vendor_uuid: '',
			is_active: false,
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
		const field = form.watch('vendors')[index];
		append({
			vendor_uuid: field.vendor_uuid,
			is_active: field.is_active,
		});
	};

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Edit Item' : 'Add Item'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section title={`Items`}>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField
					control={form.control}
					name='store'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Store'
							placeholder='Select Store'
							menuPortalTarget={document.body}
							options={stores!}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='purchase_cost_center_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Category'
							placeholder='Select Category'
							menuPortalTarget={document.body}
							options={purchases!}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='sub_purchase_cost_center_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Sub Category'
							placeholder='Select Sub Category'
							menuPortalTarget={document.body}
							options={subPurchases!}
							{...props}
						/>
					)}
				/>
				{/* <FormField
					control={form.control}
					name='vendor_price'
					render={(props) => <CoreForm.Input {...props} type='number' />}
				/> */}
				<FormField control={form.control} name='unit' render={(props) => <CoreForm.Input {...props} />} />
				{/* <FormField
					control={form.control}
					name='price_validity'
					render={(props) => (
						<CoreForm.DatePicker label='Price Validity' placeholder='Select to' {...props} />
					)}
				/> */}

				<FormField
					control={form.control}
					name='threshold'
					render={(props) => <CoreForm.Input type='number' {...props} />}
				/>
				<FormField
					control={form.control}
					name='lead_time'
					render={(props) => <CoreForm.Input type='number' {...props} />}
				/>
				<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			</CoreForm.Section>
			<CoreForm.DynamicFields
				title='Vendors'
				form={form}
				fieldName='vendors'
				fieldDefs={useGenerateFieldDefs({
					data: form.getValues(),
					copy: handleCopy,
					remove: handleRemove,
					isUpdate,
				})}
				handleAdd={handleAdd}
				fields={fields}
			/>
			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/procure/item-vendor`, // TODO: Update url
						deleteData,
						onClose: () => {
							form.setValue(
								'vendors', // TODO: Update field name
								form
									.getValues('vendors') // TODO: Update field name
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
