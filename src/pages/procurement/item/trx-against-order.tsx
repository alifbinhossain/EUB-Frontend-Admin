import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IItemTransfer, ITEM_TRANSFER_NULL, ITEM_TRANSFER_SCHEMA } from './config/schema';
import { IItemTransferAddOrUpdateProps } from './config/types';

const Trx: React.FC<IItemTransferAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
}) => {
	const { user } = useAuth();
	const MAX_QUANTITY = updatedData?.quantity ?? 0;
	const schema = ITEM_TRANSFER_SCHEMA.extend({ quantity: z.number().int().positive().max(MAX_QUANTITY) });
	const form = useRHF(schema, ITEM_TRANSFER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ITEM_TRANSFER_NULL);
		setOpen((prev) => !prev);
	};

	// Submit handler
	async function onSubmit(values: IItemTransfer) {
		// ADD NEW ITEM
		postData.mutateAsync({
			url,
			newData: {
				...values,
				is_requisition_received: false,
				item_uuid: updatedData?.item_uuid,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			},
			onClose,
		});
	}

	return (
		<AddModal open={open} setOpen={onClose} title={'Transfer Material'} form={form} onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='quantity'
				render={(props) => (
					<CoreForm.Input label={`Quantity (Max Transfer: ${MAX_QUANTITY})`} type='number' {...props} />
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default Trx;
