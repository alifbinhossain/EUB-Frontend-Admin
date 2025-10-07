import React from 'react';
import { Eye, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

import { IDetailsModalProps } from './types';

const DetailsModal: React.FC<IDetailsModalProps> = ({ title, content, className, isSmall, open, setOpen }) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
				className={cn(
					'max-h-[90vh] w-full cursor-default overflow-auto bg-background',
					isSmall && 'sm:max-w-7xl',
					className
				)}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{content}</DialogDescription>
				</DialogHeader>

				<DialogClose asChild>
					<Button
						variant='ghost'
						size='icon'
						className='absolute right-2 top-2 z-[99999] rounded-full bg-red-500 hover:bg-red-600'
					>
						<X className='h-5 w-5 text-white' />
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};

export default DetailsModal;
