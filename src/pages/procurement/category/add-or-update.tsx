import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useCategoryByUUID } from './config/query';
import { CATEGORY_NULL, CATEGORY_SCHEMA, ICategory } from './config/schema';
import { ICategoryAddOrUpdateProps } from './config/types';
import { names } from './utils';

const AddOrUpdate: React.FC<ICategoryAddOrUpdateProps> = ({
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
	const { data } = useCategoryByUUID(updatedData?.uuid as string);

	const form = useRHF(CATEGORY_SCHEMA, CATEGORY_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(CATEGORY_NULL);
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
	async function onSubmit(values: ICategory) {
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
			title={isUpdate ? 'Update Categories' : 'Add Categories'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='index'
				render={(props) => <CoreForm.Input {...props} type='number' />}
			/>
			<FormField
				control={form.control}
				name='name'
				render={(props) => (
					<CoreForm.ReactSelect label='Name' placeholder='Select names' options={names!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='is_capital'
				render={(props) => <CoreForm.Checkbox label='Is Capital' {...props} />}
			/>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
