import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useContactUsByUUID } from '../_config/query';
import { CONTACT_US_NULL, CONTACT_US_SCHEMA, IContactUs } from '../_config/schema';
import { IContactUsAddOrUpdateProps } from '../_config/types';
import { category, status } from './utils';

const AddOrUpdate: React.FC<IContactUsAddOrUpdateProps> = ({
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
	const { data } = useContactUsByUUID(updatedData?.id as number);

	const form = useRHF(CONTACT_US_SCHEMA, CONTACT_US_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(CONTACT_US_NULL);
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
	async function onSubmit(values: IContactUs) {
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
			title={isUpdate ? 'Update Contact US' : 'Add Contact US'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='full_name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='question' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='description' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
