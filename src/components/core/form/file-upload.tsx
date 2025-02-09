import { useCallback, useEffect, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { API_IMAGE_URL } from '@/lib/secret';
import { cn } from '@/lib/utils';

import { FormFileUploadProps } from './types';

const FormFileUpload: React.FC<FormFileUploadProps> = ({
	field,
	label,
	subLabel,
	optional = false,
	disabled = false,
	disableLabel,
	options,
	isUpdate,
}) => {
	const form = useFormContext();

	const [preview, setPreview] = useState<string | ArrayBuffer | null>('');

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const reader = new FileReader();
			try {
				reader.onload = () => setPreview(reader.result);
				reader.readAsDataURL(acceptedFiles[0]);
				field.onChange(acceptedFiles[0]);
				form.clearErrors(field.name);

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				setPreview(null);
				form.resetField(field.name);
			}
		},
		[form, field]
	);

	useEffect(() => {
		if (isUpdate) {
			if (field.value) {
				setPreview(API_IMAGE_URL + field.value);
			}
		}
	}, [isUpdate, field.value]);

	const { getRootProps, getInputProps, fileRejections } = useDropzone({
		onDrop,
		maxFiles: 1,
		maxSize: 1000000,
		accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
		...options,
	});

	return (
		<FormItem className='w-full space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					<span>
						{label || field.name.replace('_', ' ')}{' '}
						{optional ? <span className='text-xs'>(Optional)</span> : ''}
					</span>
					{subLabel && <span className='text-xs'>{subLabel}</span>}
				</FormLabel>
			)}

			<FormControl>
				<div {...getRootProps()} className='flex w-full items-center justify-center'>
					<label
						htmlFor='dropzone-file'
						className='flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500'
					>
						<div className='flex flex-col items-center justify-center pb-6 pt-5'>
							{preview ? (
								<img className='max-h-[100px] rounded-lg' src={preview as string} alt='User image' />
							) : (
								<>
									<ImagePlus className={cn(`block size-8`, preview && 'hidden')} />

									<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
										<span className='font-semibold'>Click to upload</span> or drag and drop
									</p>
									<p className='text-xs text-gray-500 dark:text-gray-400'>
										SVG, PNG, JPG or GIF (MAX. 800x400px)
									</p>
								</>
							)}
						</div>
						<Input disabled={disabled} {...getInputProps()} type='file' className='hidden' />
					</label>
				</div>
			</FormControl>
			<FormMessage>
				{fileRejections.length !== 0 && <p>Image must be less than 1MB and of type png, jpg, or jpeg</p>}
			</FormMessage>
		</FormItem>
	);
};

export default FormFileUpload;
