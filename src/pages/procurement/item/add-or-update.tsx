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

import { useItemByUUID } from './config/query';
import { IItem, ITEM_NULL, ITEM_SCHEMA } from './config/schema';
import { IItemAddOrUpdateProps } from './config/types';

const AddOrUpdate: React.FC<IItemAddOrUpdateProps> = ({
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
	const { data } = useItemByUUID(updatedData?.uuid as string);
	const { data: purchases } = useOtherPurchaseCostCenter<IFormSelectOption[]>();

	const form = useRHF(ITEM_SCHEMA, ITEM_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ITEM_NULL);
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
	async function onSubmit(values: IItem) {
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
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Item' : 'Add Item'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='index'
				render={(props) => <CoreForm.Input {...props} type='number' />}
			/>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='purchase_cost_center_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Purchase Cost Center'
						placeholder='Select purchase cost center'
						options={purchases!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='vendor_price'
				render={(props) => <CoreForm.Input {...props} type='number' />}
			/>
			<FormField
				control={form.control}
				name='price_validity'
				render={(props) => <CoreForm.DatePicker label='To' placeholder='Select to' {...props} />}
			/>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
