'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';

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

import type { SelectedSlot } from '../_config/types';

interface AssignmentDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedSlots: SelectedSlot[];
	onConfirmAssignment: () => void;
}

export function AssignmentDialog({ open, onOpenChange, selectedSlots, onConfirmAssignment }: AssignmentDialogProps) {
	const groupedSlots = selectedSlots.reduce(
		(acc, slot) => {
			if (!acc[slot.day]) {
				acc[slot.day] = [];
			}
			acc[slot.day].push(slot);
			return acc;
		},
		{} as Record<string, SelectedSlot[]>
	);

	const handleConfirm = () => {
		onConfirmAssignment();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-h-[80vh] max-w-2xl overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Confirm Room Assignment</DialogTitle>
					<DialogDescription>Review and confirm the selected time slots for assignment.</DialogDescription>
				</DialogHeader>

				<div className='space-y-4'>
					<div className='flex items-center gap-2'>
						<Badge variant='secondary' className='text-sm'>
							{selectedSlots.length} slot{selectedSlots.length !== 1 ? 's' : ''} selected
						</Badge>
						{selectedSlots.length > 0 && (
							<Badge variant='outline' className='text-sm'>
								<MapPin className='mr-1 h-3 w-3' />
								{selectedSlots[0].roomName}
							</Badge>
						)}
					</div>

					{Object.entries(groupedSlots).map(([day, slots]) => (
						<Card key={day}>
							<CardContent className='p-4'>
								<div className='mb-3 flex items-center gap-2'>
									<Calendar className='h-4 w-4' />
									<h3 className='font-medium'>{day}</h3>
									<Badge variant='outline' className='text-xs'>
										{slots.length} slot{slots.length !== 1 ? 's' : ''}
									</Badge>
								</div>

								<div className='grid gap-2'>
									{slots.map((slot) => (
										<div
											key={slot.slotId}
											className='flex items-center justify-between rounded-md bg-muted/50 p-2'
										>
											<div className='flex items-center gap-2'>
												<Clock className='h-3 w-3 text-muted-foreground' />
												<span className='text-sm font-medium'>
													{slot.startTime} - {slot.endTime}
												</span>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					))}

					{selectedSlots.length === 0 && (
						<div className='py-8 text-center text-muted-foreground'>
							<Calendar className='mx-auto mb-2 h-12 w-12 opacity-50' />
							<p>No time slots selected</p>
							<p className='text-sm'>Select time slots from the schedule to continue</p>
						</div>
					)}
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleConfirm} disabled={selectedSlots.length === 0}>
						Assign Selected Slots
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
