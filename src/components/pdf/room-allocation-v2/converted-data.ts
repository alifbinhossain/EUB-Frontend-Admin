// converted-data.tsx
import { RoomAllocation } from '@/pages/lib/room-allocation/entry-3/lib/types';
import { addMinutes, format, getHours, getMinutes, isWithinInterval, parse, startOfDay } from 'date-fns';

export interface ConvertedSchedule {
	semester: string;
	room: string;
	schedule: {
		[timeSlot: string]: {
			[day: string]: string;
		};
	};
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Convert "HH:mm" to minutes since midnight */
// function timeToMinutes(time: string): number {
// 	const date = parse(time, 'HH:mm', new Date());
// 	return getHours(date) * 60 + getMinutes(date);
// }

/** Convert "HH:mm" 24h to "h:mm a" */
function to12h(time: string): string {
	const date = parse(time, 'HH:mm', new Date());
	return format(date, 'h:mm a');
}

/** Generate all 20-minute slots from 09:00 to 22:50 */
export function generateAllSlots(): string[] {
	const slots: string[] = [];
	const base = startOfDay(new Date());
	const startTime = addMinutes(base, 9 * 60);
	const endTime = addMinutes(base, 22 * 60 + 50);

	let current = startTime;
	while (current <= endTime) {
		slots.push(format(current, 'h:mm a'));
		current = addMinutes(current, 20);
	}

	return slots;
}

/** Return all slot keys within [from, to] inclusive */
function getSlotsInRange(from: string, to: string, allSlots: string[]): string[] {
	const base = new Date();
	const start = parse(from, 'HH:mm', base);
	const end = parse(to, 'HH:mm', base);

	return allSlots.filter((slot) => {
		const slotDate = parse(format(parse(slot, 'h:mm a', base), 'HH:mm'), 'HH:mm', base);
		return isWithinInterval(slotDate, { start, end });
	});
}

/** Build schedule indexed by timeSlot → day → content */
export function convertScheduleWithRowspan(data: RoomAllocation[]): ConvertedSchedule {
	if (data.length === 0) {
		return { semester: 'Unknown', room: 'Unknown', schedule: {} };
	}

	const semester = data[0].semester_name!;
	const room = data[0].room_name;
	const slots = generateAllSlots();

	// Initialize empty schedule
	const schedule: ConvertedSchedule['schedule'] = {};
	slots.forEach((ts) => {
		schedule[ts] = {};
		days.forEach((d) => {
			schedule[ts][d] = '';
		});
	});

	// Populate schedule
	data.forEach((entry) => {
		const dayKey = entry.day.charAt(0).toUpperCase() + entry.day.slice(1).toLowerCase();
		const content = [
			entry.course_code,
			entry.course_section,
			entry.teacher_name,
			`(${to12h(entry.from)}–${to12h(entry.to)})`,
		]
			.filter(Boolean)
			.join('\n');

		const hitSlots = getSlotsInRange(entry.from, entry.to, slots);
		hitSlots.forEach((ts) => {
			schedule[ts][dayKey] = content;
		});
	});

	return { semester, room, schedule };
}
