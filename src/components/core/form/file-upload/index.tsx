import { useCallback, useEffect, useState } from 'react';
import { Repeat } from 'lucide-react';
import { Accept, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { API_IMAGE_URL } from '@/lib/secret';
import { cn } from '@/lib/utils';

import { FormFileUploadProps } from '../types';
import { DocumentPreview, ImagePreview, VideoPreview } from './previews';

const FormFileUpload: React.FC<FormFileUploadProps> = ({
	field,
	label,
	subLabel,
	optional = false,
	disabled = false,
	disableLabel,
	options,
	isUpdate,
	fileType = 'image',
	errorText = 'Image must be less than 1MB and of type png, jpg, or jpeg',
	className,
	previewClassName,
}) => {
	const [update, setUpdate] = useState(isUpdate);
	const form = useFormContext();

	const [preview, setPreview] = useState<string | ArrayBuffer | null>('');

	const acceptedFile: Accept =
		fileType === 'image'
			? { 'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.webp'] }
			: fileType === 'video'
				? { 'video/*': ['.mp4', '.mov', '.wmv', '.flv', '.avi'] }
				: fileType === 'audio'
					? { 'audio/*': ['.mp3', '.wav', '.ogg'] }
					: fileType === 'document'
						? { 'application/*': ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'] }
						: fileType === 'all'
							? {}
							: {};

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const reader = new FileReader();
			try {
				setUpdate(false);
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
		if (update) {
			if (field.value && typeof field.value === 'string' && field.value !== '') {
				setPreview(API_IMAGE_URL + field.value);
			}
		}
	}, [update, field.value]);

	const { getRootProps, getInputProps, fileRejections, inputRef } = useDropzone({
		onDrop,
		maxFiles: 1,
		maxSize: 1000000,
		accept: acceptedFile,
		...options,
	});

	return (
		<FormItem className='relative flex w-full flex-col space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					<span>
						{label || field.name.replace('_', ' ')}{' '}
						{optional ? <span className='text-xs'>(Optional)</span> : ''}
					</span>
					{subLabel && <span className='text-xs font-normal text-foreground'>{subLabel}</span>}
				</FormLabel>
			)}

			<FormControl>
				<div {...getRootProps()} className={cn('flex flex-1 items-center justify-center')}>
					<label
						htmlFor='dropzone-file'
						className={cn(
							'border-300 relative flex size-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500',
							className
						)}
					>
						{fileType === 'image' && <ImagePreview preview={preview} className={previewClassName} />}
						{fileType === 'video' && <VideoPreview preview={preview} />}
						{fileType === 'document' && <DocumentPreview preview={preview} />}

						<Input disabled={disabled} {...getInputProps()} type='file' className='hidden' />
					</label>
				</div>
			</FormControl>
			<FormMessage>{fileRejections.length !== 0 && errorText}</FormMessage>

			{preview && (
				<div className='absolute bottom-3 right-3 z-50 size-fit'>
					<Button
						type={'button'}
						variant={'default'}
						size={'icon'}
						onClick={() => {
							inputRef.current?.click();
						}}
					>
						<Repeat className='size-4' />
					</Button>
				</div>
			)}
		</FormItem>
	);
};

export default FormFileUpload;
