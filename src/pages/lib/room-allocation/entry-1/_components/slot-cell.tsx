import React from 'react';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell } from '@/components/ui/table';

import { cn } from '@/lib/utils';

import type { Slot, SlotStatus } from '../_config/types';

interface SlotCellProps {
	slot?: Slot;
	day: string;
	timeSlotId: string;
	isSelected: boolean;
	onSlotClick: (day: string, timeSlotId: string) => void;
	onEditSlot: (day: string, timeSlotId: string) => void;
	onDeleteSlot: (day: string, timeSlotId: string) => void;
}

const SlotContent = React.memo<{
	status: SlotStatus;
	slot?: Slot;
	onEditSlot: (day: string, timeSlotId: string) => void;
	onDeleteSlot: (day: string, timeSlotId: string) => void;
	day: string;
	timeSlotId: string;
}>(({ status, slot, onEditSlot, onDeleteSlot, day, timeSlotId }) => {
	if (status === 'available') {
		return (
			<div className='text-center text-gray-500'>
				<div className='text-sm'>Available</div>
			</div>
		);
	}

	if (status === 'selected') {
		return (
			<div className='text-center'>
				<Badge variant='default' className='bg-blue-600 text-white'>
					Selected
				</Badge>
			</div>
		);
	}

	if (status === 'reserved' && slot) {
		return (
			<div className='relative w-full p-2 text-center'>
				<div className='mb-1 text-xs font-medium text-gray-700'>{slot.section}</div>
				<Badge variant='secondary' className='bg-gray-100 text-xs text-gray-700'>
					Reserved
				</Badge>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							size='sm'
							className='absolute right-1 top-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100'
						>
							<MoreVertical className='h-3 w-3' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='center'>
						<DropdownMenuItem onClick={() => onEditSlot(day, timeSlotId)}>
							<Edit className='mr-2 h-4 w-4' />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onDeleteSlot(day, timeSlotId)} className='text-red-600'>
							<Trash2 className='mr-2 h-4 w-4' />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	}

	return null;
});

SlotContent.displayName = 'SlotContent';

export const SlotCell = React.memo<SlotCellProps>(
	({ slot, day, timeSlotId, isSelected, onSlotClick, onEditSlot, onDeleteSlot }) => {
		const getSlotStatus = (): SlotStatus => {
			if (!slot) return 'available';
			if (isSelected) return 'selected';
			return slot.status;
		};

		const status = getSlotStatus();

		const handleClick = React.useCallback(() => {
			onSlotClick(day, timeSlotId);
		}, [onSlotClick, day, timeSlotId]);

		return (
			<TableCell className='border border-gray-200 p-0'>
				<div
					className={cn(
						'group relative flex min-h-[80px] w-full cursor-pointer items-center justify-center',
						{
							'bg-white hover:bg-gray-50': status === 'available',
							'bg-gray-50': status === 'reserved',
							'border-l-2 border-l-blue-600 bg-blue-50': status === 'selected',
						}
					)}
					onClick={handleClick}
				>
					<SlotContent
						status={status}
						slot={slot}
						onEditSlot={onEditSlot}
						onDeleteSlot={onDeleteSlot}
						day={day}
						timeSlotId={timeSlotId}
					/>
				</div>
			</TableCell>
		);
	}
);

SlotCell.displayName = 'SlotCell';
