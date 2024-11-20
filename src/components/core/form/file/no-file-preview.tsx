import React from 'react';
import { Upload } from 'lucide-react';

const NoFilePreview: React.FC<{ multiple?: boolean; text?: string }> = ({ multiple = false, text }) => {
	return (
		<div className='flex size-full flex-col items-center justify-center gap-2'>
			<Upload />
			<p className='text-sm font-medium'>{text || 'Click to upload or drag and drop'}</p>
		</div>
	);
};

export default NoFilePreview;
