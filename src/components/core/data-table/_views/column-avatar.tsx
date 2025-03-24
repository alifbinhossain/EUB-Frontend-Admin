import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { API_IMAGE_URL } from '@/lib/secret';
import { cn } from '@/lib/utils';

const ColumnAvatar: React.FC<{
	src: string;
	alt: string;
	className?: string;
}> = ({ src, alt, className }) => {
	return (
		<Avatar className='size-12 border shadow-sm'>
			<AvatarImage src={API_IMAGE_URL + src} alt={alt} className={cn('object-cover object-top', className)} />
			<AvatarFallback>{alt.split(' ')?.[0]?.at(0) + '' + alt.split(' ')?.[1]?.at(0)}</AvatarFallback>
		</Avatar>
	);
};

export default ColumnAvatar;
