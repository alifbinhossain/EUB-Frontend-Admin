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
			title={isUpdate ? 'Update Articles' : 'Add Articles'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
				<div className='order-last md:order-first'>
					<FormField
						control={form.control}
						name='type'
						render={(props) => (
							<CoreForm.ReactSelect
								options={[
									{ value: 'article', label: 'Article' },
									{ value: 'hero', label: 'Hero' },
								]}
								{...props}
							/>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='is_active'
					render={(props) => <CoreForm.Switch label='Active' {...props} />}
				/>
			</div>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
				<div className='space-y-4'>
					<FormField control={form.control} name='title' render={(props) => <CoreForm.Input {...props} />} />
					<FormField
						control={form.control}
						name='description'
						render={(props) => <CoreForm.Textarea rows={4} {...props} />}
					/>

					<FormField
						control={form.control}
						name='index'
						render={(props) => <CoreForm.Input type='number' {...props} />}
					/>

					<FormField
						control={form.control}
						name='remarks'
						render={(props) => <CoreForm.Textarea {...props} />}
					/>
				</div>

				<div className='space-y-4'>
					<FormField
						control={form.control}
						name='file'
						render={(props) => (
							<CoreForm.FileUpload
								subLabel={
									form.watch('type') === 'hero'
										? 'Recommend size (1905x723)'
										: 'Recommend ratio 1:1 (300x300)'
								}
								className='h-full'
								fileType='image'
								isUpdate={isUpdate}
								{...props}
							/>
						)}
					/>
				</div>
			</div>
		</AddModal>
	);
};

export default AddOrUpdate;
