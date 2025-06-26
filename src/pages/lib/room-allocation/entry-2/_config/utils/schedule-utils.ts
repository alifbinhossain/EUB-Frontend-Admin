import { DAYS_OF_WEEK, TIME_SLOTS, type TimeSlot } from '../types';

export function generateScheduleData(): Record<string, TimeSlot[]> {
	const schedule: Record<string, TimeSlot[]> = {};

	DAYS_OF_WEEK.forEach((day) => {
		schedule[day.full] = TIME_SLOTS.map((timeSlot) => {
			// Simulate some pre-allocated slots
			const isAvailable = Math.random() > 0.25;
			const assignedTo = !isAvailable ? `SEC-${Math.floor(Math.random() * 4) + 1}` : undefined;

			// Create booking info for reserved slots
			const booking = !isAvailable
				? {
						id: `booking-${day.full}-${timeSlot.start}`,
						title: `Class ${Math.floor(Math.random() * 3) + 1}`,
						assignedTo: assignedTo!,
						startTime: timeSlot.start,
						endTime: timeSlot.end,
						day: day.full,
						description: `Scheduled class for ${assignedTo}`,
					}
				: undefined;

			return {
				id: `${day.full}-${timeSlot.start}-${timeSlot.end}`,
				day: day.full,
				startTime: timeSlot.start,
				endTime: timeSlot.end,
				isAvailable,
				isSelected: false,
				assignedTo,
				booking,
			};
		});
	});

	return schedule;
}

export function formatTimeRange(start: string, end: string): string {
	return `${start} - ${end}`;
}
