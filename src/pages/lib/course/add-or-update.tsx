import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherCategory, useOtherSubCategory } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useFDECourseByUUID } from '../config/query';
import { COURSE_NULL, COURSE_SCHEMA, ICourse } from '../config/schema';
import { ICourseAddOrUpdateProps } from '../config/types';
import { type } from './utils';

const AddOrUpdate: React.FC<ICourseAddOrUpdateProps> = ({
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
	const { data } = useFDECourseByUUID(updatedData?.uuid as string);
	const { data: category } = useOtherCategory<IFormSelectOption[]>();
	const { invalidateQuery: invalidateQuerySubCategory } = useOtherSubCategory();

	const form = useRHF(COURSE_SCHEMA, COURSE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(COURSE_NULL);
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
	async function onSubmit(values: ICourse) {
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
			invalidateQuerySubCategory();
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
			invalidateQuerySubCategory();
		}
	}
	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Course' : 'Add New Course'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='code' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
