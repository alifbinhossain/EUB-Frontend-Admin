import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherVendor } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useItemTransferByUUID } from '../config/query';
import { IItemTransfer, ITEM_TRANSFER_NULL, ITEM_TRANSFER_SCHEMA } from '../config/schema';
import { IItemTransferAddOrUpdateProps } from '../config/types';

const AddOrUpdate: React.FC<IItemTransferAddOrUpdateProps> = ({
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
	const { data } = useItemTransferByUUID(updatedData?.uuid as string);

	const form = useRHF(ITEM_TRANSFER_SCHEMA, ITEM_TRANSFER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ITEM_TRANSFER_NULL);
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
			title={`Updated Transfer ITem ${updatedData?.item_name}`}
			form={form}
			isSmall={true}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='is_requisition_received'
				render={(props) => <CoreForm.Checkbox label='Requisition Received' {...props} />}
			/>
			<FormField
				control={form.control}
				name='quantity'
				render={(props) => (
					<CoreForm.Input
						label={`Quantity (Max Transfer: ${updatedData?.max_quantity})`}
						type='number'
						{...props}
					/>
				)}
			/>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
