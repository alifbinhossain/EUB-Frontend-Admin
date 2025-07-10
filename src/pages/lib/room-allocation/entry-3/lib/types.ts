export interface Room {
	uuid: string;
	name: string;
	type: 'general' | 'lab';
	location?: string;
	capacity: number;
}

export interface RoomAllocation {
	uuid: string;
	room_uuid: string;
	sem_crs_thr_entry_uuid: string;
	teacher_name?: string;
	room_name?: string;
	semester_uuid?: string;
	course_code?: string;
	course_name?: string;
	course_section?: string;
	day: 'sat' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
	from: string; // HH:MM format
	to: string; // HH:MM format
}

export interface TimeSlot {
	start: string;
	end: string;
	available: boolean;
}

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const WEEKDAYS: { value: Weekday; label: string }[] = [
	{ value: 'mon', label: 'Monday' },
	{ value: 'tue', label: 'Tuesday' },
	{ value: 'wed', label: 'Wednesday' },
	{ value: 'thu', label: 'Thursday' },
	{ value: 'fri', label: 'Friday' },
	{ value: 'sat', label: 'Saturday' },
	{ value: 'sun', label: 'Sunday' },
];
