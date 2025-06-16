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

import { useFDEQuestionCategory, useFDEQuestionCategoryByUUID } from '../config/query';
import { IQuestionCategory, QUESTION_CATEGORY_NULL, QUESTION_CATEGORY_SCHEMA } from '../config/schema';
import { IQuestionCategoryAddOrUpdateProps } from '../config/types';

const AddOrUpdate: React.FC<IQuestionCategoryAddOrUpdateProps> = ({
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
	const { data } = useFDEQuestionCategoryByUUID(updatedData?.uuid as string);
	const { data: category } = useOtherCategory<IFormSelectOption[]>();
	const { invalidateQuery: invalidateQuerySubCategory } = useFDEQuestionCategory();

	const form = useRHF(QUESTION_CATEGORY_SCHEMA, QUESTION_CATEGORY_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(QUESTION_CATEGORY_NULL);
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
	async function onSubmit(values: IQuestionCategory) {
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
			title={isUpdate ? 'Update Question Category' : 'Add New Question Category'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='index'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='min_percentage'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
