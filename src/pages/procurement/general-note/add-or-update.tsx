import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useGeneralNoteByUUID } from './config/query';
import { GENERAL_NOTE_NULL, GENERAL_NOTE_SCHEMA, IGeneralNote } from './config/schema';
import { IGeneralNoteAddOrUpdateProps } from './config/types';

const AddOrUpdate: React.FC<IGeneralNoteAddOrUpdateProps> = ({
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
	const { data } = useGeneralNoteByUUID(updatedData?.uuid as string);

	const form = useRHF(GENERAL_NOTE_SCHEMA, GENERAL_NOTE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(GENERAL_NOTE_NULL);
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
	async function onSubmit(values: IGeneralNote) {
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
			title={isUpdate ? 'Update General Note' : 'Add General Note'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='service_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Service' placeholder='Select Service' options={[]} {...props} />
				)}
			/>
			<FormField control={form.control} name='description' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField
				control={form.control}
				name='amount'
				render={(props) => <CoreForm.Input type='number ' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
