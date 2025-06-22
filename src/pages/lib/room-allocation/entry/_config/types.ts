export interface Room {
	id: string;
	name: string;
}

export interface TimeSlot {
	id: string;
	start: string;
	end: string;
	label: string;
}

export interface Slot {
	id: string;
	roomId: string;
	day: string;
	timeSlotId: string;
	status: 'available' | 'reserved';
	assignedTo?: string;
	date?: string;
	section?: string;
}

export interface SelectedSlot {
	id: string;
	day: string;
	timeSlotId: string;
	timeLabel: string;
}

export type SlotStatus = 'available' | 'reserved' | 'selected';
