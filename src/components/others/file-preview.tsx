import { Eye } from 'lucide-react';

import { API_IMAGE_URL } from '@/lib/secret';

import { buttonVariants } from '../ui/button';

const FilePreview: React.FC<{ preview: string | ArrayBuffer | null }> = ({ preview }) => {
	return (
		<a
			className={buttonVariants({
				variant: 'gradient',
				className: 'h-10 w-full gap-2',
			})}
			target='_blank'
			href={(API_IMAGE_URL + preview) as string}
		>
			View File
			<Eye className='size-5' />
		</a>
	);
};

export default FilePreview;
