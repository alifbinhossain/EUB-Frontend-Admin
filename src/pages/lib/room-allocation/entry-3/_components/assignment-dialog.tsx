'use client';

import { useState } from 'react';
import { BookOpen, Building2, Calendar, CheckCircle2, Clock, Loader2, MapPin, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import { formatTime } from '../lib/time-utils';
import type { Room, Weekday } from '../lib/types';

interface AssignmentDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	room: Room;
	day: Weekday;
	startTime: string;
	endTime: string;
	semesterId: string;
	onConfirm: () => Promise<void>;
}

export function AssignmentDialog({
	open,
	onOpenChange,
	room,
	day,
	startTime,
	endTime,
	semesterId,
	onConfirm,
}: AssignmentDialogProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const calculateDuration = (start: string, end: string): string => {
		const [startHour, startMin] = start.split(':').map(Number);
		const [endHour, endMin] = end.split(':').map(Number);

		const startMinutes = startHour * 60 + startMin;
		const endMinutes = endHour * 60 + endMin;
		const diffMinutes = endMinutes - startMinutes;

		const hours = Math.floor(diffMinutes / 60);
		const minutes = diffMinutes % 60;

		if (hours === 0) return `${minutes} minutes`;
		if (minutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
		return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
	};

	const getDayName = (day: Weekday): string => {
		const dayNames = {
			mon: 'Monday',
			tue: 'Tuesday',
			wed: 'Wednesday',
			thu: 'Thursday',
			fri: 'Friday',
			sat: 'Saturday',
			sun: 'Sunday',
		};
		return dayNames[day];
	};

	const handleConfirm = async () => {
		setIsSubmitting(true);
		try {
			await onConfirm();
			onOpenChange(false);
		} catch (error) {
			console.error('Assignment failed:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-md border-slate-200 shadow-lg'>
				<DialogHeader className='pb-4'>
					<DialogTitle className='flex items-center gap-2 text-slate-800'>
						<CheckCircle2 className='h-5 w-5 text-emerald-600' />
						Confirm Assignment
					</DialogTitle>
					<DialogDescription className='text-sm text-slate-600'>
						Review the details below before confirming your room assignment.
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-4'>
					{/* Room Information */}
					<Card className='border-slate-200'>
						<CardContent className='p-4'>
							<div className='mb-3 flex items-start justify-between'>
								<div className='flex items-center gap-2'>
									<Building2 className='h-4 w-4 text-slate-500' />
									<span className='font-medium text-slate-800'>{room.name}</span>
								</div>
								<Badge
									variant='secondary'
									className={cn(
										'h-5 px-2 text-xs',
										room.type === 'lab'
											? 'border-blue-200 bg-blue-100 text-blue-700'
											: 'bg-slate-100 text-slate-700'
									)}
								>
									{room.type}
								</Badge>
							</div>

							<div className='space-y-2 text-sm text-slate-600'>
								{room.location && (
									<div className='flex items-center gap-2'>
										<MapPin className='h-3 w-3' />
										<span>{room.location}</span>
									</div>
								)}
								<div className='flex items-center gap-2'>
									<Users className='h-3 w-3' />
									<span>Capacity: {room.capacity}</span>
								</div>
								<div className='flex items-center gap-2'>
									<BookOpen className='h-3 w-3' />
									<span>ID: {room.uuid}</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Separator className='bg-slate-200' />

					{/* Schedule Information */}
					<div className='space-y-3'>
						<div className='flex items-center gap-2'>
							<Calendar className='h-4 w-4 text-slate-500' />
							<span className='font-medium text-slate-800'>Schedule</span>
						</div>

						<div className='grid grid-cols-2 gap-4 text-sm'>
							<div>
								<span className='text-slate-500'>Day:</span>
								<div className='font-medium text-slate-800'>{getDayName(day)}</div>
							</div>
							<div>
								<span className='text-slate-500'>Duration:</span>
								<div className='font-medium text-slate-800'>
									{calculateDuration(startTime, endTime)}
								</div>
							</div>
						</div>

						<div className='flex items-center justify-center rounded-md border border-blue-200 bg-blue-50 p-3'>
							<Clock className='mr-2 h-4 w-4 text-blue-600' />
							<span className='font-medium text-blue-800'>
								{formatTime(startTime)} - {formatTime(endTime)}
							</span>
						</div>
					</div>

					<Separator className='bg-slate-200' />

					{/* Semester Information */}
					<div className='space-y-2'>
						<div className='flex items-center gap-2'>
							<BookOpen className='h-4 w-4 text-slate-500' />
							<span className='font-medium text-slate-800'>Semester</span>
						</div>
						<div className='text-sm'>
							<span className='text-slate-500'>ID:</span>
							<div className='font-medium text-slate-800'>{semesterId}</div>
						</div>
					</div>
				</div>

				<DialogFooter className='gap-2 pt-4'>
					<Button
						variant='outline'
						onClick={() => onOpenChange(false)}
						disabled={isSubmitting}
						className='h-9'
					>
						Cancel
					</Button>
					<Button onClick={handleConfirm} disabled={isSubmitting} className='h-9 min-w-[120px]'>
						{isSubmitting ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Assigning...
							</>
						) : (
							'Confirm'
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
