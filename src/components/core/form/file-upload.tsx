import { ImagePlus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

import { FormFileUploadProps } from './types';

const FormFileUpload: React.FC<FormFileUploadProps> = ({
	field,
	label,
	subLabel,
	placeholder = 'Write here',
	optional = false,
	type,
	className,
	icon,
	disabled = false,
	disableLabel,
	onDrop,
}) => {
	const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
		onDrop,
		maxFiles: 1,
		maxSize: 1000000,
		accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
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
									<Input {...getInputProps()} type='file' />

									<p className='mb-2 text-sm text-gray-500'>
										<span className='font-semibold'>Click to upload</span> or drag and drop
									</p>
									<p className='text-xs text-gray-500'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
								</>
							)}
						</div>
						<Input {...getInputProps()} type='file' className='hidden' />
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
