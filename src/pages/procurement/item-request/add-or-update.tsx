import { useEffect } from 'react';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { getDateTime } from '@/utils';

import { useItemRequestedByUUID } from '../log/config/query';
import { IRequest, REQUEST_NULL, REQUEST_SCHEMA } from '../log/config/schema';
import { IItemRequestAddOrUpdateProps } from '../log/config/types';

const AddOrUpdate: React.FC<IItemRequestAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;
	const { data } = useItemRequestedByUUID(updatedData?.uuid as string);

	const form = useRHF(REQUEST_SCHEMA, REQUEST_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(REQUEST_NULL);
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
	async function onSubmit(values: IRequest) {
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
			title={`Updated Request Item ${updatedData?.item_name}`}
			form={form}
			isSmall={false}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='request_quantity'
				render={(props) => <CoreForm.Input label='Request Quantity' type='number' {...props} />}
			/>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
