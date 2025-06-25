import { useCallback, useState } from 'react';

import { AssignmentDialog } from './_components/assignment-dialog';
import { RoomSelector } from './_components/room-selector';
import { ScheduleTable } from './_components/schedule.table';
import { SelectedSlotsSummary } from './_components/selected-slots-summary';
import { useSlotOperations } from './_config/hooks';
import { daysOfWeek, fetchAvailableSlots, mockRooms, timeSlots } from './_config/mock-data';
import type { SelectedSlot, Slot } from './_config/types';

export default function RoomAllocation() {
	const [selectedRoom, setSelectedRoom] = useState<string>('');
	const [slots, setSlots] = useState<Slot[]>([]);
	const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
	const [loading, setLoading] = useState(false);
	const [assignDialogOpen, setAssignDialogOpen] = useState(false);

	const { getSlotForDayAndTime, isSlotSelected, handleSlotClick, handleEditSlot, handleDeleteSlot } =
		useSlotOperations({
			slots,
			selectedSlots,
			timeSlots,
			setSlots,
			setSelectedSlots,
		});

	const handleRoomSelect = useCallback(async (roomId: string) => {
		setSelectedRoom(roomId);
		setSelectedSlots([]);
		setLoading(true);

		try {
			const availableSlots = await fetchAvailableSlots(roomId);
			setSlots(availableSlots);
		} catch (error) {
			console.error('Failed to fetch slots:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	const handleAssign = useCallback(() => {
		if (selectedSlots.length === 0) return;
		setAssignDialogOpen(true);
	}, [selectedSlots.length]);

	const confirmAssignment = useCallback(() => {
		setSlots((prev) =>
			prev.map((slot) => {
				const isSelected = selectedSlots.some((s) => s.day === slot.day && s.timeSlotId === slot.timeSlotId);
				if (isSelected) {
					return { ...slot, status: 'reserved' as const, assignedTo: 'Current User', section: 'NEW-SEC' };
				}
				return slot;
			})
		);

		setSelectedSlots([]);
		setAssignDialogOpen(false);
	}, [selectedSlots]);

	return (
		<div className='min-h-screen bg-gray-50 p-6'>
			<div className='mx-auto max-w-6xl space-y-6'>
				{/* Header */}
				<div className='text-center'>
					<h1 className='mb-2 text-3xl font-bold text-foreground'>Room Allocation System</h1>
					<p className='text-secondary'>Manage and assign room slots efficiently</p>
				</div>

				{/* Room Selection */}
				<RoomSelector rooms={mockRooms} selectedRoom={selectedRoom} onRoomSelect={handleRoomSelect} />

				{/* Schedule Table */}
				{selectedRoom && (
					<ScheduleTable
						timeSlots={timeSlots}
						daysOfWeek={daysOfWeek}
						slots={slots}
						selectedSlots={selectedSlots}
						loading={loading}
						onSlotClick={handleSlotClick}
						onEditSlot={handleEditSlot}
						onDeleteSlot={handleDeleteSlot}
						getSlotForDayAndTime={getSlotForDayAndTime}
						isSlotSelected={isSlotSelected}
					/>
				)}

				{/* Selected Slots Summary */}
				<SelectedSlotsSummary selectedSlots={selectedSlots} onAssign={handleAssign} />

				{/* Assignment Dialog */}
				<AssignmentDialog
					open={assignDialogOpen}
					onOpenChange={setAssignDialogOpen}
					selectedSlots={selectedSlots}
					selectedRoom={selectedRoom}
					rooms={mockRooms}
					onConfirm={confirmAssignment}
				/>
			</div>
		</div>
	);
}
