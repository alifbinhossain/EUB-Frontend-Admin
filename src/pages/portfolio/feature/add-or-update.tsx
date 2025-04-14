import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { useFeatureByUUID } from './config/query';
import { FEATURE_NULL, FEATURE_SCHEMA, IFeature } from './config/schema';
import { IFeatureAddOrUpdateProps } from './config/types';

const AddOrUpdate: React.FC<IFeatureAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	imagePostData,
	imageUpdateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useFeatureByUUID(updatedData?.uuid as string);

	const form = useRHF(FEATURE_SCHEMA, FEATURE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(FEATURE_NULL);
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
	async function onSubmit(values: IFeature) {
		const formData = Formdata<IFeature>(values);

		if (isUpdate) {
			formData.append('updated_at', getDateTime());

			// UPDATE ITEM
			await imageUpdateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: formData,
				onClose,
			});

			return;
		} else {
			// ADD NEW ITEM
			formData.append('created_at', getDateTime());
			formData.append('created_by', user?.uuid || '');
			formData.append('uuid', nanoid());

			await imagePostData.mutateAsync({
				url,
				newData: formData,
				onClose,
			});
		}
	}

	return (
		<AddModal
			isSmall
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Feature' : 'Add Feature'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
				<div className='col-span-2 space-y-4'>
					<FormField
						control={form.control}
						name='is_active'
						render={(props) => <CoreForm.Switch label='Active' {...props} />}
					/>
					<FormField
						control={form.control}
						name='index'
						render={(props) => <CoreForm.Input type='number' {...props} />}
					/>
					<FormField control={form.control} name='title' render={(props) => <CoreForm.Input {...props} />} />
					<FormField
						control={form.control}
						name='description'
						render={(props) => <CoreForm.Textarea rows={4} {...props} />}
					/>
					<FormField
						control={form.control}
						name='remarks'
						render={(props) => <CoreForm.Textarea {...props} />}
					/>
				</div>
				<FormField
					control={form.control}
					name='file'
					render={(props) => <CoreForm.FileUpload fileType='image' isUpdate={isUpdate} {...props} />}
				/>
			</div>
		</AddModal>
	);
};

export default AddOrUpdate;
