'use client';

import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import type { Room, SelectedSlot } from '../_config/types';

interface AssignmentDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedSlots: SelectedSlot[];
	selectedRoom: string;
	rooms: Room[];
	onConfirm: () => void;
}

export const AssignmentDialog = React.memo<AssignmentDialogProps>(
	({ open, onOpenChange, selectedSlots, selectedRoom, rooms, onConfirm }) => {
		const selectedRoomName = React.useMemo(
			() => rooms.find((r) => r.id === selectedRoom)?.name,
			[rooms, selectedRoom]
		);

		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className='max-w-2xl'>
					<DialogHeader>
						<DialogTitle>Confirm Slot Assignment</DialogTitle>
						<DialogDescription>
							Please review the selected slots before confirming the assignment.
						</DialogDescription>
					</DialogHeader>

					<div className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<h4 className='mb-2 font-medium'>Room:</h4>
								<p className='text-sm text-gray-600'>{selectedRoomName}</p>
							</div>
							<div>
								<h4 className='mb-2 font-medium'>Date:</h4>
								<p className='text-sm text-gray-600'>{new Date().toLocaleDateString()}</p>
							</div>
						</div>

						<div>
							<h4 className='mb-2 font-medium'>Selected Slots ({selectedSlots.length}):</h4>
							<div className='overflow-hidden rounded-lg border'>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Day</TableHead>
											<TableHead>Time</TableHead>
											<TableHead>Room ID</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{selectedSlots.map((slot, index) => (
											<TableRow key={index}>
												<TableCell className='font-medium'>{slot.day}</TableCell>
												<TableCell>{slot.timeLabel}</TableCell>
												<TableCell>
													<Badge variant='outline'>{selectedRoom}</Badge>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button variant='outline' onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button onClick={onConfirm}>Confirm Assignment</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}
);

AssignmentDialog.displayName = 'AssignmentDialog';
