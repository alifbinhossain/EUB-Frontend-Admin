import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherDepartments, useOtherUser } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { useNewsByUUID } from '../_config/query';
import { INews, NEWS_NULL, NEWS_SCHEMA } from '../_config/schema';
import { INewsAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<INewsAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
	imagePostData,
	imageUpdateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useNewsByUUID(updatedData?.uuid as string);
	const { data: departments } = useOtherDepartments<IFormSelectOption[]>();

	const form = useRHF(NEWS_SCHEMA, NEWS_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(NEWS_NULL);
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
	async function onSubmit(values: INews) {
		const formData = Formdata<INews>(values);

		if (isUpdate) {
			formData.append('updated_at', getDateTime());
			// UPDATE ITEM
			imageUpdateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: formData,
				onClose,
			});
		} else {
			formData.append('created_at', getDateTime());
			formData.append('created_by', user?.uuid || '');
			formData.append('uuid', nanoid());

			// ADD NEW ITEM
			imagePostData.mutateAsync({
				url,
				newData: formData,
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Club' : 'Add Club'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='title' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='subtitle' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='department_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Department'
						placeholder='Select Department'
						options={departments!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='published_date'
				render={(props) => <CoreForm.DatePicker {...props} />}
			/>
			<FormField control={form.control} name='description' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='content' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField
				control={form.control}
				name='cover_image'
				render={(props) => <CoreForm.FileUpload isUpdate={isUpdate} {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
