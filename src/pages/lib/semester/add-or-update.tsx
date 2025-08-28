import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useFDESemesterByUUID } from '../config/query';
import { ISemester, SEMESTER_NULL, SEMESTER_SCHEMA } from '../config/schema';
import { ISemesterAddOrUpdateProps } from '../config/types';

const AddOrUpdate: React.FC<ISemesterAddOrUpdateProps> = ({
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
	const { data } = useFDESemesterByUUID(updatedData?.uuid as string);

	const form = useRHF(SEMESTER_SCHEMA, SEMESTER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(SEMESTER_NULL);
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
	async function onSubmit(values: ISemester) {
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
			title={isUpdate ? 'Update Semester' : 'Add New Semester'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='started_at'
				render={(props) => <CoreForm.DatePicker label='Started At' {...props} />}
			/>
			<FormField
				control={form.control}
				name='mid_started_at'
				render={(props) => <CoreForm.DatePicker label='Mid Exam Date' {...props} />}
			/>
			<FormField
				control={form.control}
				name='final_started_at'
				render={(props) => <CoreForm.DatePicker label='Final Exam Date' {...props} />}
			/>
			<FormField control={form.control} name='ended_at' render={(props) => <CoreForm.DatePicker {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
