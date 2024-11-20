import { useState } from 'react';
import Dropzone from 'react-dropzone';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { cn } from '@/lib/utils';

import { FormFileProps } from '../types';
import NoFilePreview from './no-file-preview';
import Preview from './preview';

const FormFile: React.FC<FormFileProps> = ({
	field,
	label,
	subLabel,
	optional = false,
	className,
	disabled = false,
	multi = true,
	disableLabel,
	accept,
}) => {
	const [onDrag, setOnDrag] = useState(false);
	const files: FileList | null = field.value ? field.value : null;

	return (
		<FormItem className='space-y-1.5'>
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
				<div>
					<Dropzone
						accept={accept}
						multiple={multi}
						onError={(err) => console.log(err)}
						onDragEnter={() => setOnDrag(true)}
						onDragLeave={() => setOnDrag(false)}
						onDropAccepted={() => setOnDrag(false)}
						onDropRejected={() => setOnDrag(false)}
						onDrop={(acceptedFiles) => field.onChange(acceptedFiles)}
					>
						{({ getRootProps, getInputProps }) => (
							<div
								className={cn(
									'bg-gradient relative aspect-video rounded border-2 border-dashed',
									onDrag && 'border-blue-600/50'
								)}
								{...getRootProps()}
							>
								{onDrag ? <div className='absolute inset-0 z-10 rounded bg-blue-600/50'></div> : null}
								<input {...getInputProps()} />
								<NoFilePreview />
							</div>
						)}
					</Dropzone>
					{files && files.length > 0 ? <Preview files={files} /> : null}
				</div>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormFile;
