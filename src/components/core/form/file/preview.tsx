import React from 'react';
import { Eye, File, FileImage, Trash2, Video } from 'lucide-react';
import { useFormContext, useFormState } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useFormField } from '@/components/ui/form';

import { IFileType } from '../types';

const FileType: React.FC<{ type: IFileType }> = ({ type }) => {
	switch (type) {
		case 'image':
			return <FileImage className='size-4' />;
		case 'video':
			return <Video className='size-4' />;
		case 'application':
			return <File className='size-4' />;

		default:
			return <File className='size-4' />;
	}
};

const FilePreview: React.FC<{ file: File }> = ({ file }) => {
	const type = file.type.split('/')[0] as IFileType;

	return (
		<li
			className='bg-gradient flex items-center justify-between gap-4 rounded border border-input px-2 py-1'
			key={file.name}
		>
			<div className='flex items-center gap-2'>
				<FileType type={type} />
				<p className='max-w-[260px] truncate text-sm'>{file.name}</p>
			</div>

			<div className='flex items-center'>
				<Dialog>
					<DialogTrigger asChild>
						<Button size={'icon'} variant='ghost' className='rounded-full'>
							<Eye className='size-4' />
						</Button>
					</DialogTrigger>
					<DialogContent className='p-2 sm:max-w-[725px]'>
						<div className='aspect-video h-full'>
							{type === 'image' && (
								<img
									className='size-full object-contain'
									src={URL.createObjectURL(file)}
									alt={file.name}
								/>
							)}
							{type === 'video' && (
								<video
									muted
									controls
									className='size-full rounded object-contain'
									src={URL.createObjectURL(file)}
								/>
							)}
							{type === 'application' && (
								<iframe src={URL.createObjectURL(file)} width='100%' height='100%' />
							)}
						</div>
					</DialogContent>
				</Dialog>
				<Button size={'icon'} variant='ghost-destructive' className='rounded-full'>
					<Trash2 className='size-4' />
				</Button>
			</div>
		</li>
	);
};

interface PreviewProps {
	files: FileList | File;
}

const Preview: React.FC<PreviewProps> = ({ files }) => {
	if (Array.isArray(files)) {
		return (
			<ul className='mt-2 space-y-2'>
				{Array.from(files).map((file) => {
					return (
						<li key={file.name}>
							<FilePreview file={file} />
						</li>
					);
				})}
			</ul>
		);
	}

	return (
		<div className='mt-2'>
			<FilePreview file={files as File} />
		</div>
	);
};

export default Preview;
