'use client';

import type React from 'react';
import { useState } from 'react';
import { Edit, MoreVertical, Plus, Trash2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';

import type { TimeSlot } from '../_config/types';

interface ScheduleCellProps {
	slot: TimeSlot;
	onToggleSelect: (slotId: string) => void;
	onAddBooking: (slot: TimeSlot) => void;
	onEditBooking: (slot: TimeSlot) => void;
	onDeleteBooking: (slot: TimeSlot) => void;
	isDragging: boolean;
	onMouseDown: (slotId: string) => void;
	onMouseEnter: (slotId: string) => void;
	onMouseUp: () => void;
}

export function ScheduleCell({
	slot,
	onToggleSelect,
	onAddBooking,
	onEditBooking,
	onDeleteBooking,
	isDragging,
	onMouseDown,
	onMouseEnter,
	onMouseUp,
}: ScheduleCellProps) {
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [dragStarted, setDragStarted] = useState(false);

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsMouseDown(true);
		setDragStarted(false);

		if (slot.isAvailable) {
			onMouseDown(slot.id);
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isMouseDown && !dragStarted) {
			setDragStarted(true);
		}
	};

	const handleMouseUp = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsMouseDown(false);

		// If it was just a click (no drag), toggle selection
		if (!dragStarted && slot.isAvailable) {
			onToggleSelect(slot.id);
		}

		setDragStarted(false);
		onMouseUp();
	};

	const handleMouseEnter = () => {
		if (isDragging && slot.isAvailable) {
			onMouseEnter(slot.id);
		}
	};

	const handleAddBooking = (e: React.MouseEvent) => {
		e.stopPropagation();
		onAddBooking(slot);
	};

	const handleEditBooking = (e: React.MouseEvent) => {
		e.stopPropagation();
		onEditBooking(slot);
	};

	const handleDeleteBooking = (e: React.MouseEvent) => {
		e.stopPropagation();
		onDeleteBooking(slot);
	};

	const handleRemoveSelection = (e: React.MouseEvent) => {
		e.stopPropagation();
		onToggleSelect(slot.id);
	};

	return (
		<td
			className={cn('relative h-8 min-w-[140px] select-none border border-border transition-all duration-200', {
				'cursor-pointer bg-green-50 hover:bg-green-100': slot.isAvailable && !slot.isSelected,
				'cursor-pointer bg-blue-100 ring-2 ring-blue-300': slot.isAvailable && slot.isSelected,
				'bg-red-50': !slot.isAvailable,
				'ring-2 ring-blue-400': isDragging && slot.isAvailable,
			})}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseEnter={handleMouseEnter}
		>
			<div className='flex h-full items-center justify-center p-0.5'>
				{slot.isAvailable ? (
					slot.isSelected ? (
						<div className='flex items-center gap-1'>
							<span className='text-xs font-medium text-blue-700'>Selected</span>
							<Button
								size='sm'
								variant='ghost'
								className='h-3 w-3 rounded-full bg-red-500 p-0 text-white hover:bg-red-600'
								onClick={handleRemoveSelection}
							>
								<X className='h-1.5 w-1.5' />
							</Button>
						</div>
					) : (
						<Button
							size='sm'
							variant='ghost'
							className='h-4 w-4 rounded-full bg-green-500 p-0 text-white opacity-0 transition-opacity hover:bg-green-600 group-hover:opacity-100'
							onClick={handleAddBooking}
						>
							<Plus className='h-2 w-2' />
						</Button>
					)
				) : (
					<div className='flex w-full items-center justify-between px-0.5'>
						<div className='min-w-0 flex-1'>
							<div className='truncate text-xs font-medium text-red-700'>
								{slot.booking?.title || 'Reserved'}
							</div>
							<div className='truncate text-xs text-red-600'>
								{slot.booking?.assignedTo || slot.assignedTo}
							</div>
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									size='sm'
									variant='ghost'
									className='ml-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-red-500 p-0 text-white hover:bg-red-600'
								>
									<MoreVertical className='h-1.5 w-1.5' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem onClick={handleEditBooking}>
									<Edit className='mr-2 h-3 w-3' />
									Edit
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleDeleteBooking} className='text-red-600'>
									<Trash2 className='mr-2 h-3 w-3' />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</div>
		</td>
	);
}
