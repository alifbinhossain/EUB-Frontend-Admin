import { useEffect } from 'react';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherItem } from '@/lib/common-queries/other';
import { getDateTime } from '@/utils';

import { useItemRequisitionByUUID } from '../config/query';
import { IItemRequisition, ITEM_REQUISITION_NULL, ITEM_REQUISITION_SCHEMA } from '../config/schema';
import { IItemRequisitionAddOrUpdateProps } from '../config/types';

const AddOrUpdate: React.FC<IItemRequisitionAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { data } = useItemRequisitionByUUID(updatedData?.uuid as string);
	const { data: itemOption } = useOtherItem<IFormSelectOption[]>();

	const form = useRHF(ITEM_REQUISITION_SCHEMA, ITEM_REQUISITION_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ITEM_REQUISITION_NULL);
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
	async function onSubmit(values: IItemRequisition) {
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
			title={`Updated ITem Requisition ${updatedData?.item_name}`}
			form={form}
			isSmall={true}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='item_uuid'
				render={(props) => <CoreForm.ReactSelect label='Item' options={itemOption!} {...props} />}
			/>
			<FormField
				control={form.control}
				name='req_quantity'
				render={(props) => <CoreForm.Input label={'Requested Quantity'} type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='provided_quantity'
				render={(props) => <CoreForm.Input label={'Provided Quantity'} type='number' {...props} />}
			/>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
