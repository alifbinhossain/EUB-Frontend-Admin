'use client';

import type React from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import type { TimeSlot } from '../_config/types';

interface TimeSlotProps {
	slot: TimeSlot;
	onSelect: (slotId: string) => void;
	onDeselect: (slotId: string) => void;
	onDelete: (slotId: string) => void;
	isDragging: boolean;
	onMouseDown: (slotId: string) => void;
	onMouseEnter: (slotId: string) => void;
	onMouseUp: () => void;
}

export function TimeSlotComponent({
	slot,
	onSelect,
	onDeselect,
	onDelete,
	isDragging,
	onMouseDown,
	onMouseEnter,
	onMouseUp,
}: TimeSlotProps) {
	const handleClick = () => {
		if (!slot.isAvailable) return;

		if (slot.isSelected) {
			onDeselect(slot.id);
		} else {
			onSelect(slot.id);
		}
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		if (slot.isAvailable) {
			onMouseDown(slot.id);
		}
	};

	const handleMouseEnter = () => {
		if (isDragging && slot.isAvailable) {
			onMouseEnter(slot.id);
		}
	};

	return (
		<div
			className={cn(
				'relative min-h-[60px] select-none rounded-md border border-border p-2 transition-all duration-200',
				{
					'cursor-pointer border-green-200 bg-green-50 hover:bg-green-100':
						slot.isAvailable && !slot.isSelected,
					'cursor-pointer border-blue-300 bg-blue-100': slot.isAvailable && slot.isSelected,
					'cursor-not-allowed border-red-200 bg-red-50': !slot.isAvailable,
					'ring-2 ring-blue-400': isDragging && slot.isAvailable,
				}
			)}
			onClick={handleClick}
			onMouseDown={handleMouseDown}
			onMouseEnter={handleMouseEnter}
			onMouseUp={onMouseUp}
		>
			<div className='text-xs font-medium'>
				{slot.startTime} - {slot.endTime}
			</div>

			{slot.isAvailable ? (
				<div className='mt-1 text-xs text-muted-foreground'>{slot.isSelected ? 'Selected' : 'Available'}</div>
			) : (
				<div className='mt-1 text-xs text-red-600'>
					<div>Reserved</div>
					{slot.assignedTo && <div className='font-medium'>{slot.assignedTo}</div>}
				</div>
			)}

			{slot.isSelected && (
				<Button
					size='sm'
					variant='ghost'
					className='absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500 p-0 text-white hover:bg-red-600'
					onClick={(e) => {
						e.stopPropagation();
						onDeselect(slot.id);
					}}
				>
					<X className='h-3 w-3' />
				</Button>
			)}
		</div>
	);
}
