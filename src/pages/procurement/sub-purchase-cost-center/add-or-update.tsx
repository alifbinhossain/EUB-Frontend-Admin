import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherPurchaseCostCenter } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useSubPurchaseCostCenterByUUID } from './config/query';
import {
	ISubPurchaseCostCenter,
	SUB_PURCHASE_COST_CENTER_NULL,
	SUB_PURCHASE_COST_CENTER_SCHEMA,
} from './config/schema';
import { ISubPurchaseCostCenterAddOrUpdateProps } from './config/types';

const AddOrUpdate: React.FC<ISubPurchaseCostCenterAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useSubPurchaseCostCenterByUUID(updatedData?.uuid as string);
	const { data: purchaseCostCenter } = useOtherPurchaseCostCenter<IFormSelectOption[]>();
	const { invalidateQuery: invalidateQueryPurchaseCostCenter } = useOtherPurchaseCostCenter();

	const form = useRHF(SUB_PURCHASE_COST_CENTER_SCHEMA, SUB_PURCHASE_COST_CENTER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(SUB_PURCHASE_COST_CENTER_NULL);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	console.log(form.formState.errors);
	// Submit handler
	async function onSubmit(values: ISubPurchaseCostCenter) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
			invalidateQueryPurchaseCostCenter();
		} else {
			// ADD NEW ITEM
			postData.mutateAsync({
				url,
				newData: {
					...values,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
			invalidateQueryPurchaseCostCenter();
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Sub Category' : 'Add Sub Category'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='purchase_cost_center_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Category'
						placeholder='Select Category'
						options={purchaseCostCenter!}
						{...props}
					/>
				)}
			/>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
