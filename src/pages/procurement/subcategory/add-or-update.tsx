import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherCategory } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useSubCategoryByUUID } from './config/query';
import { ISubCategory, SUB_CATEGORY_NULL, SUB_CATEGORY_SCHEMA } from './config/schema';
import { ISubCategoryAddOrUpdateProps } from './config/types';
import { type } from './utils';

const AddOrUpdate: React.FC<ISubCategoryAddOrUpdateProps> = ({
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
	const { data } = useSubCategoryByUUID(updatedData?.uuid as string);
	const { data: category } = useOtherCategory<IFormSelectOption[]>();

	const form = useRHF(SUB_CATEGORY_SCHEMA, SUB_CATEGORY_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(SUB_CATEGORY_NULL);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	console.log(form.formState.errors);
	// Submit handler
	async function onSubmit(values: ISubCategory) {
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
			title={isUpdate ? 'Update Department' : 'Add Department'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='index'
				render={(props) => <CoreForm.Input {...props} type='number' />}
			/>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='category_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Category'
						placeholder='Select category'
						options={category!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='type'
				render={(props) => (
					<CoreForm.ReactSelect label='Type' placeholder='Select type' options={type!} {...props} />
				)}
			/>

			<FormField
				control={form.control}
				name='min_amount'
				render={(props) => <CoreForm.Input {...props} type='number' />}
			/>
			<FormField
				control={form.control}
				name='min_quotation'
				render={(props) => <CoreForm.Input {...props} type='number' />}
			/>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
