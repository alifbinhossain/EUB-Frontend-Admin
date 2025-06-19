import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IRequest, REQUEST_NULL, REQUEST_SCHEMA } from './config/schema';
import { IItemRequestAddOrUpdateProps } from './config/types';

const Trx: React.FC<IItemRequestAddOrUpdateProps> = ({ url, open, setOpen, updatedData, setUpdatedData, postData }) => {
	const { user } = useAuth();

	const form = useRHF(REQUEST_SCHEMA, REQUEST_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(REQUEST_NULL);
		setOpen((prev) => !prev);
	};

	// Submit handler
	async function onSubmit(values: IRequest) {
		// ADD NEW ITEM
		postData.mutateAsync({
			url,
			newData: {
				...values,
				item_uuid: updatedData?.item_uuid,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			},
			onClose,
		});
	}

	return (
		<AddModal open={open} setOpen={onClose} title={'Request Item'} form={form} onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='request_quantity'
				render={(props) => <CoreForm.Input label='Request Quantity' type='number' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default Trx;
