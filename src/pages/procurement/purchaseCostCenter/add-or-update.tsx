import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherPurchaseCostCenter, useOtherSubCategory } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { usePurchaseCostCenterByUUID } from './config/query';
import { IPurchaseCostCenter, PURCHASE_COST_CENTER_NULL, PURCHASE_COST_CENTER_SCHEMA } from './config/schema';
import { IPurchaseCostCenterAddOrUpdateProps } from './config/types';

const AddOrUpdate: React.FC<IPurchaseCostCenterAddOrUpdateProps> = ({
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
	const { data } = usePurchaseCostCenterByUUID(updatedData?.uuid as string);
	const { data: subCategory } = useOtherSubCategory<IFormSelectOption[]>();
	const { invalidateQuery: invalidateQueryPurchaseCostCenter } = useOtherPurchaseCostCenter();

	const form = useRHF(PURCHASE_COST_CENTER_SCHEMA, PURCHASE_COST_CENTER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(PURCHASE_COST_CENTER_NULL);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);
	// Submit handler
	async function onSubmit(values: IPurchaseCostCenter) {
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
			title={isUpdate ? 'Update Category' : 'Add Category'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='sub_category_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Sub Segment'
						placeholder='Select sub-segment'
						options={subCategory!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='from'
				render={(props) => <CoreForm.DatePicker label='From' placeholder='Select from' {...props} />}
			/>
			<FormField
				control={form.control}
				name='to'
				render={(props) => <CoreForm.DatePicker label='To' placeholder='Select to' {...props} />}
			/>

			<FormField
				control={form.control}
				name='budget'
				render={(props) => <CoreForm.Input {...props} type='number' />}
			/>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
