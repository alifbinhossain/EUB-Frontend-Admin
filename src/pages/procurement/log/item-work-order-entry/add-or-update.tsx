import { useEffect } from 'react';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherItem } from '@/lib/common-queries/other';
import { getDateTime } from '@/utils';

import { useItemWorkOrderEntryByUUID } from '../config/query';
import { IItemTransfer, ITEM_WORK_ORDER_NULL, ITEM_WORK_ORDER_SCHEMA } from '../config/schema';
import { IItemWorkOrderAddOrUpdateProps } from '../config/types';

const AddOrUpdate: React.FC<IItemWorkOrderAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { data } = useItemWorkOrderEntryByUUID(updatedData?.uuid as string);
	const { data: itemOption } = useOtherItem<IFormSelectOption[]>();

	const form = useRHF(ITEM_WORK_ORDER_SCHEMA, ITEM_WORK_ORDER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ITEM_WORK_ORDER_NULL);
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
	async function onSubmit(values: IItemTransfer) {
		// UPDATE ITEM
		updateData.mutateAsync({
			url: `${url}/${updatedData?.uuid}`,
			updatedData: {
				...values,
				updated_at: getDateTime(),
			},
			onClose,
		});
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={`Updated Item Work Order Entry Item ${updatedData?.item_name}`}
			form={form}
			isSmall={true}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='is_received'
				render={(props) => <CoreForm.Checkbox label='Received' {...props} />}
			/>
			<FormField
				control={form.control}
				name='item_uuid'
				render={(props) => <CoreForm.ReactSelect label='Item' options={itemOption!} {...props} />}
			/>
			<FormField
				control={form.control}
				name='quantity'
				render={(props) => <CoreForm.Input label={`Quantity`} type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='unit_price'
				render={(props) => <CoreForm.Input label={`Unit Price`} type='number' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
