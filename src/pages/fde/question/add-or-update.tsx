import { useEffect } from 'react';
import { placeholderCSS } from 'node_modules/react-select/dist/declarations/src/components/Placeholder';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherQuestionCategory } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useFDEQuestion, useFDEQuestionByUUID } from '../config/query';
import { IQuestion, QUESTION_NULL, QUESTION_SCHEMA } from '../config/schema';
import { IQuestionAddOrUpdateProps } from '../config/types';

const AddOrUpdate: React.FC<IQuestionAddOrUpdateProps> = ({
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
	const { data } = useFDEQuestionByUUID(updatedData?.uuid as string);
	const { data: questionCategoryOptions } = useOtherQuestionCategory<IFormSelectOption[]>();
	const { invalidateQuery: invalidateQuerySubCategory } = useFDEQuestion();

	const form = useRHF(QUESTION_SCHEMA, QUESTION_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(QUESTION_NULL);
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
	async function onSubmit(values: IQuestion) {
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
			title={isUpdate ? 'Update Question' : 'Add New Question'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='active' render={(props) => <CoreForm.Checkbox {...props} />} />
			<FormField
				control={form.control}
				name='index'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='qns_category_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Question Category'
						placeholder='Select Question Category'
						menuPortalTarget={document.body}
						options={questionCategoryOptions!}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
