import React from 'react';
import { Eye } from 'lucide-react';

interface PreviewProps {
	files: FileList;
}

const Preview: React.FC<PreviewProps> = ({ files }) => {
	return (
		<ul className='mt-2 space-y-2'>
			{Array.from(files).map((file) => (
				<li
					className='bg-gradient flex items-center justify-between rounded border border-input px-2 py-1'
					key={file.name}
				>
					<p>{file.name}</p>

					<div>
						<Eye className='size-4' />
					</div>
				</li>
			))}
		</ul>
	);
};

export default Preview;
