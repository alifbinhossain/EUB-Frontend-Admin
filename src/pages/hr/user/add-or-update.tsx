import { useCallback, useEffect, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';
import { AddModal } from '@core/modal';

import { useOtherDepartment, useOtherDesignation } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { API_IMAGE_URL } from '@/lib/secret';
import { cn } from '@/lib/utils';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { useHrUsersByUUID } from '../_config/query';
import { IUser, USER_NULL, USER_SCHEMA } from '../_config/schema';
import { IUserAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IUserAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	imagePostData,
	imageUpdateData,
}) => {
	const [preview, setPreview] = useState<string | ArrayBuffer | null>('');
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useHrUsersByUUID(updatedData?.uuid as string);
	const { data: departmentData } = useOtherDepartment<IFormSelectOption[]>();
	const { data: designationData } = useOtherDesignation<IFormSelectOption[]>();

	const form = useRHF(USER_SCHEMA(isUpdate) as any, USER_NULL);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const reader = new FileReader();
			try {
				reader.onload = () => setPreview(reader.result);
				reader.readAsDataURL(acceptedFiles[0]);
				form.setValue('image', acceptedFiles[0]);
				form.clearErrors('image');
			} catch (error) {
				setPreview(null);
				form.resetField('image');
			}
		},
		[form]
	);

	const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
		onDrop,
		maxFiles: 1,
		maxSize: 1000000,
		accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
	});

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(USER_NULL);
		setPreview(null);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
			setPreview(API_IMAGE_URL + form.getValues('image'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IUser) {
		const formData = Formdata<IUser>(values);

		if (isUpdate) {
			formData.append('updated_at', getDateTime());
			// UPDATE ITEM
			await imageUpdateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: formData,
				onClose,
			});

			return;
		}

		// ADD NEW ITEM
		formData.append('created_at', getDateTime());
		formData.append('created_by', user?.uuid || '');
		formData.append('uuid', nanoid());
		formData.append('pass', values.pass || '');
		formData.append('repeatPass', values.repeatPass || '');

		await imagePostData.mutateAsync({
			url,
			newData: formData,
			onClose,
		});
	}

	return (
		<AddModal
			isSmall
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update User' : 'Add User'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='flex gap-4'>
				<FormField
					control={form.control}
					name='department_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Department'
							placeholder='Select Department'
							options={departmentData!}
							{...props}
						/>
					)}
				/>

				<FormField
					control={form.control}
					name='designation_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Designation'
							placeholder='Select Designation'
							options={designationData!}
							{...props}
						/>
					)}
				/>
			</div>
			<div className='flex gap-4'>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='email' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='phone' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='office' render={(props) => <CoreForm.Input {...props} />} />
			</div>
			{!isUpdate && (
				<div className='flex gap-4'>
					<FormField
						control={form.control}
						name='pass'
						render={(props) => <CoreForm.Input label='Password' type={'password'} {...props} />}
					/>
					<FormField
						control={form.control}
						name='repeatPass'
						render={(props) => <CoreForm.Input label='Repeat Password' type={'password'} {...props} />}
					/>
				</div>
			)}
			<div className='flex gap-4'>
				<FormField
					control={form.control}
					name='image'
					render={() => (
						<FormItem className='flex w-full flex-col items-start justify-center'>
							<FormLabel className='flex items-center justify-between capitalize'>Image</FormLabel>
							<FormControl>
								<div {...getRootProps()} className='flex w-full items-center justify-center'>
									<label
										htmlFor='dropzone-file'
										className='flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500'
									>
										<div className='flex flex-col items-center justify-center pb-6 pt-5'>
											{preview ? (
												<img
													className='max-h-[100px] rounded-lg'
													src={preview as string}
													alt='User image'
												/>
											) : (
												<>
													<ImagePlus className={cn(`block size-8`, preview && 'hidden')} />

													<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
														<span className='font-semibold'>Click to upload</span> or drag
														and drop
													</p>
													<p className='text-xs text-gray-500 dark:text-gray-400'>
														SVG, PNG, JPG or GIF (MAX. 800x400px)
													</p>
												</>
											)}
											<Input {...getInputProps()} type='file' />
										</div>
										<Input {...getInputProps()} type='file' className='hidden' />
									</label>
								</div>
							</FormControl>
							<FormMessage>
								{fileRejections.length !== 0 && (
									<p>Image must be less than 1MB and of type png, jpg, or jpeg</p>
								)}
							</FormMessage>
						</FormItem>
					)}
				/>
				<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			</div>
		</AddModal>
	);
};

export default AddOrUpdate;
