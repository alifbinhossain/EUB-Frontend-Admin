import type { Room, Slot, TimeSlot } from './types';

export const mockRooms: Room[] = [
	{ id: 'room-1', name: 'Conference Room A' },
	{ id: 'room-2', name: 'Meeting Room B' },
	{ id: 'room-3', name: 'Training Room C' },
	{ id: 'room-4', name: 'Board Room' },
];

export const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export const timeSlots: TimeSlot[] = [
	{ id: 'slot-1', start: '08:00', end: '10:00', label: '08-10' },
	{ id: 'slot-2', start: '10:00', end: '12:00', label: '10-12' },
	{ id: 'slot-3', start: '12:00', end: '15:00', label: '12-03' },
	{ id: 'slot-4', start: '15:00', end: '18:00', label: '03-06' },
];

export const fetchAvailableSlots = async (roomId: string): Promise<Slot[]> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const slots: Slot[] = [];
	daysOfWeek.forEach((day) => {
		timeSlots.forEach((timeSlot) => {
			const isReserved = Math.random() > 0.7;
			slots.push({
				id: `${roomId}-${day}-${timeSlot.id}`,
				roomId,
				day,
				timeSlotId: timeSlot.id,
				status: isReserved ? 'reserved' : 'available',
				assignedTo: isReserved ? `Section-${Math.floor(Math.random() * 3) + 1}` : undefined,
				date: new Date().toISOString().split('T')[0],
				section: isReserved ? `SEC-${Math.floor(Math.random() * 5) + 1}` : undefined,
			});
		});
	});

	return slots;
};
