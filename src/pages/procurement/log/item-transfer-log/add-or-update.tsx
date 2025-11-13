import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherVendor } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { ITicketEntry } from '../../ticket/config/columns/columns.type';
import { useItemReqTicketEntry, useItemTransferByUUID } from '../config/query';
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
	const { data: itemData } = useItemReqTicketEntry<ITicketEntry>(updatedData?.uuid as string);

	const form = useRHF(ITEM_TRANSFER_SCHEMA, ITEM_TRANSFER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ITEM_TRANSFER_NULL);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate && updatedData) {
			if (updatedData?.table_name === 'item_transfer' && data) {
				form.reset(data);
			}
			if (updatedData?.table_name === 'req_ticket_item' && itemData) {
				form.setValue('item_uuid', itemData?.item_uuid);
				form.setValue('quantity', itemData?.quantity as number);
				form.setValue('remarks', itemData?.remarks as string);
				form.setValue('is_requisition_received', itemData?.is_resolved as boolean);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate, updatedData, itemData]);

	// Submit handler
	async function onSubmit(values: IItemTransfer) {
		if (updatedData?.table_name === 'item_transfer') {
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			updateData.mutateAsync({
				url: `/procure/req-ticket-item/${updatedData?.uuid}`,
				updatedData: {
					...values,
					reason: updatedData?.reason,
					is_resolved: values.is_requisition_received,
					updated_at: getDateTime(),
				},
				onClose,
			});
		}
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
			{updatedData?.table_name !== 'req_ticket_item' && (
				<FormField
					control={form.control}
					name='is_requisition_received'
					render={(props) => (
						<CoreForm.Checkbox
							label={updatedData?.table_name === 'item_transfer' ? 'Requisition Received' : 'Resolved'}
							disabled={updatedData?.table_name === 'req_ticket_item'}
							{...props}
						/>
					)}
				/>
			)}

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
