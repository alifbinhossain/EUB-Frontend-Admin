export interface Room {
	id: string;
	name: string;
	type: 'classroom' | 'lab' | 'meeting' | 'conference';
	capacity: number;
}

export interface TimeSlot {
	id: string;
	day: string;
	startTime: string;
	endTime: string;
	isAvailable: boolean;
	isSelected: boolean;
	assignedTo?: string;
	booking?: BookingInfo;
}

export interface SelectedSlot {
	roomId: string;
	roomName: string;
	day: string;
	startTime: string;
	endTime: string;
	slotId: string;
}

export interface BookingInfo {
	id: string;
	title: string;
	assignedTo: string;
	startTime: string;
	endTime: string;
	day: string;
	description?: string;
}

export const DAYS_OF_WEEK = [
	{ short: 'Sun', full: 'Sunday' },
	{ short: 'Mon', full: 'Monday' },
	{ short: 'Tue', full: 'Tuesday' },
	{ short: 'Wed', full: 'Wednesday' },
	{ short: 'Thu', full: 'Thursday' },
	{ short: 'Fri', full: 'Friday' },
	{ short: 'Sat', full: 'Saturday' },
] as const;

// Generate time slots from 9:00 AM to 6:00 PM (10-minute intervals)
export const TIME_SLOTS = [
	{ start: '09:00', end: '09:10', display: '9:00 AM' },
	{ start: '09:10', end: '09:20', display: '9:10 AM' },
	{ start: '09:20', end: '09:30', display: '9:20 AM' },
	{ start: '09:30', end: '09:40', display: '9:30 AM' },
	{ start: '09:40', end: '09:50', display: '9:40 AM' },
	{ start: '09:50', end: '10:00', display: '9:50 AM' },
	{ start: '10:00', end: '10:10', display: '10:00 AM' },
	{ start: '10:10', end: '10:20', display: '10:10 AM' },
	{ start: '10:20', end: '10:30', display: '10:20 AM' },
	{ start: '10:30', end: '10:40', display: '10:30 AM' },
	{ start: '10:40', end: '10:50', display: '10:40 AM' },
	{ start: '10:50', end: '11:00', display: '10:50 AM' },
	{ start: '11:00', end: '11:10', display: '11:00 AM' },
	{ start: '11:10', end: '11:20', display: '11:10 AM' },
	{ start: '11:20', end: '11:30', display: '11:20 AM' },
	{ start: '11:30', end: '11:40', display: '11:30 AM' },
	{ start: '11:40', end: '11:50', display: '11:40 AM' },
	{ start: '11:50', end: '12:00', display: '11:50 AM' },
	{ start: '12:00', end: '12:10', display: '12:00 PM' },
	{ start: '12:10', end: '12:20', display: '12:10 PM' },
	{ start: '12:20', end: '12:30', display: '12:20 PM' },
	{ start: '12:30', end: '12:40', display: '12:30 PM' },
	{ start: '12:40', end: '12:50', display: '12:40 PM' },
	{ start: '12:50', end: '13:00', display: '12:50 PM' },
	{ start: '13:00', end: '13:10', display: '1:00 PM' },
	{ start: '13:10', end: '13:20', display: '1:10 PM' },
	{ start: '13:20', end: '13:30', display: '1:20 PM' },
	{ start: '13:30', end: '13:40', display: '1:30 PM' },
	{ start: '13:40', end: '13:50', display: '1:40 PM' },
	{ start: '13:50', end: '14:00', display: '1:50 PM' },
	{ start: '14:00', end: '14:10', display: '2:00 PM' },
	{ start: '14:10', end: '14:20', display: '2:10 PM' },
	{ start: '14:20', end: '14:30', display: '2:20 PM' },
	{ start: '14:30', end: '14:40', display: '2:30 PM' },
	{ start: '14:40', end: '14:50', display: '2:40 PM' },
	{ start: '14:50', end: '15:00', display: '2:50 PM' },
	{ start: '15:00', end: '15:10', display: '3:00 PM' },
	{ start: '15:10', end: '15:20', display: '3:10 PM' },
	{ start: '15:20', end: '15:30', display: '3:20 PM' },
	{ start: '15:30', end: '15:40', display: '3:30 PM' },
	{ start: '15:40', end: '15:50', display: '3:40 PM' },
	{ start: '15:50', end: '16:00', display: '3:50 PM' },
	{ start: '16:00', end: '16:10', display: '4:00 PM' },
	{ start: '16:10', end: '16:20', display: '4:10 PM' },
	{ start: '16:20', end: '16:30', display: '4:20 PM' },
	{ start: '16:30', end: '16:40', display: '4:30 PM' },
	{ start: '16:40', end: '16:50', display: '4:40 PM' },
	{ start: '16:50', end: '17:00', display: '4:50 PM' },
	{ start: '17:00', end: '17:10', display: '5:00 PM' },
	{ start: '17:10', end: '17:20', display: '5:10 PM' },
	{ start: '17:20', end: '17:30', display: '5:20 PM' },
	{ start: '17:30', end: '17:40', display: '5:30 PM' },
	{ start: '17:40', end: '17:50', display: '5:40 PM' },
	{ start: '17:50', end: '18:00', display: '5:50 PM' },
] as const;
