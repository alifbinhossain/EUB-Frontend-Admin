import { useCallback, useMemo, useState } from 'react';
import { CalendarDays, MapPin, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { AssignmentDialog } from './_components/assignment-dialog';
import { RoomSelector } from './_components/room-selector';
import { ScheduleTable } from './_components/schedule-table';
import type { Room, SelectedSlot, TimeSlot } from './_config/types';

// Mock data for rooms
const MOCK_ROOMS: Room[] = [
	{ id: '1', name: 'Meeting Room A', type: 'meeting', capacity: 8 },
	{ id: '2', name: 'Meeting Room B', type: 'meeting', capacity: 12 },
	{ id: '3', name: 'Classroom 101', type: 'classroom', capacity: 30 },
	{ id: '4', name: 'Lab Room 1', type: 'lab', capacity: 20 },
	{ id: '5', name: 'Conference Hall', type: 'conference', capacity: 50 },
	{ id: '6', name: 'Study Room C', type: 'meeting', capacity: 6 },
];

export default function RoomAllocationSystem() {
	const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
	const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
	const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
	// const { toast } = useToast();

	const selectedRoom = useMemo(() => MOCK_ROOMS.find((room) => room.id === selectedRoomId) || null, [selectedRoomId]);

	const selectedSlotsForDialog = useMemo((): SelectedSlot[] => {
		if (!selectedRoom) return [];

		return selectedSlots.map((slot) => ({
			roomId: selectedRoom.id,
			roomName: selectedRoom.name,
			day: slot.day,
			startTime: slot.startTime,
			endTime: slot.endTime,
			slotId: slot.id,
		}));
	}, [selectedSlots, selectedRoom]);

	const handleRoomSelect = useCallback((roomId: string) => {
		setSelectedRoomId(roomId);
		setSelectedSlots([]); // Clear selected slots when changing rooms
	}, []);

	const handleSlotsChange = useCallback((slots: TimeSlot[]) => {
		setSelectedSlots(slots);
	}, []);

	const handleAssignSlots = useCallback(() => {
		if (selectedSlots.length === 0) {
			// toast({
			// 	title: 'No slots selected',
			// 	description: 'Please select at least one time slot to assign.',
			// 	variant: 'destructive',
			// });
			return;
		}
		setIsAssignmentDialogOpen(true);
	}, [selectedSlots.length]);

	const handleConfirmAssignment = useCallback(() => {
		// Here you would typically make an API call to assign the slots
		// toast({
		// 	title: 'Slots assigned successfully',
		// 	description: `${selectedSlots.length} time slot${selectedSlots.length !== 1 ? 's' : ''} assigned to ${selectedRoom?.name}`,
		// });

		// Clear selected slots after assignment
		setSelectedSlots([]);
	}, []);

	return (
		<div className='min-h-screen bg-background p-4 md:p-6 lg:p-8'>
			<div className='mx-auto max-w-7xl space-y-6'>
				{/* Header */}
				<div className='space-y-2 text-center'>
					<h1 className='text-3xl font-bold tracking-tight'>Room Allocation System</h1>
					<p className='text-muted-foreground'>Manage and assign room slots efficiently</p>
				</div>

				{/* Room Selection */}
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center gap-2'>
							<MapPin className='h-5 w-5' />
							Room Selection
						</CardTitle>
						<CardDescription>Choose a room to view and manage its schedule</CardDescription>
					</CardHeader>
					<CardContent>
						<RoomSelector
							rooms={MOCK_ROOMS}
							selectedRoom={selectedRoomId}
							onRoomSelect={handleRoomSelect}
						/>

						{selectedRoom && (
							<div className='mt-4 flex items-center gap-4'>
								<Badge variant='secondary' className='flex items-center gap-1'>
									<Users className='h-3 w-3' />
									Capacity: {selectedRoom.capacity}
								</Badge>
								<Badge variant='outline'>
									{selectedRoom.type.charAt(0).toUpperCase() + selectedRoom.type.slice(1)}
								</Badge>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Schedule Table */}
				{selectedRoomId && (
					<>
						<ScheduleTable roomId={selectedRoomId} onSlotsChange={handleSlotsChange} />

						{/* Action Bar */}
						<Card>
							<CardContent className='p-4'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-4'>
										<Badge variant='secondary' className='flex items-center gap-1'>
											<CalendarDays className='h-3 w-3' />
											{selectedSlots.length} slot{selectedSlots.length !== 1 ? 's' : ''} selected
										</Badge>
										{selectedRoom && (
											<span className='text-sm text-muted-foreground'>
												for {selectedRoom.name}
											</span>
										)}
									</div>

									<Button onClick={handleAssignSlots} disabled={selectedSlots.length === 0} size='lg'>
										Assign Selected Slots
									</Button>
								</div>
							</CardContent>
						</Card>
					</>
				)}

				{/* Assignment Dialog */}
				<AssignmentDialog
					open={isAssignmentDialogOpen}
					onOpenChange={setIsAssignmentDialogOpen}
					selectedSlots={selectedSlotsForDialog}
					onConfirmAssignment={handleConfirmAssignment}
				/>
			</div>
		</div>
	);
}
