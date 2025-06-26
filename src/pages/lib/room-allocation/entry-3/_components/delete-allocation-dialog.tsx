'use client';

import { useState } from 'react';
import { AlertTriangle, Clock, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import { formatTime } from '../lib/time-utils';
import type { RoomAllocation } from '../lib/types';

interface DeleteAllocationDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	allocation: RoomAllocation | null;
	onConfirm: (allocationId: string) => Promise<void>;
}

export function DeleteAllocationDialog({ open, onOpenChange, allocation, onConfirm }: DeleteAllocationDialogProps) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleConfirm = async () => {
		if (!allocation) return;

		setIsDeleting(true);
		try {
			await onConfirm(allocation.uuid);
			onOpenChange(false);
		} catch (error) {
			console.error('Delete failed:', error);
		} finally {
			setIsDeleting(false);
		}
	};

	if (!allocation) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<AlertTriangle className='h-5 w-5 text-red-600' />
						Delete Allocation
					</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this time allocation? This action cannot be undone.
					</DialogDescription>
				</DialogHeader>

				<div className='rounded-lg border border-red-200 bg-red-50 p-4'>
					<div className='flex items-center gap-2 text-red-800'>
						<Clock className='h-4 w-4' />
						<span className='font-medium'>
							{formatTime(allocation.from)} - {formatTime(allocation.to)}
						</span>
					</div>
					<div className='mt-1 text-sm text-red-700'>
						Day: {allocation.day.charAt(0).toUpperCase() + allocation.day.slice(1)}
					</div>
				</div>

				<DialogFooter className='gap-2'>
					<Button variant='outline' onClick={() => onOpenChange(false)} disabled={isDeleting}>
						Cancel
					</Button>
					<Button
						variant='destructive'
						onClick={handleConfirm}
						disabled={isDeleting}
						className='min-w-[100px]'
					>
						{isDeleting ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Deleting...
							</>
						) : (
							'Delete Allocation'
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
