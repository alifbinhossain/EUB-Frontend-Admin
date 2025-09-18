import { all } from 'axios';

import type { GlobalSettings } from '../hooks/use-global-settings';
import type { RoomAllocation, TimeSlot } from './types';

// Default settings for when global settings aren't available
const DEFAULT_SETTINGS = {
	timeSlotDuration: 10,
	startHour: 9,
	endHour: 19,
};

export function generateTimeSlots(settings?: GlobalSettings): string[] {
	const config = settings || DEFAULT_SETTINGS;
	const slots: string[] = [];

	for (let hour = config.startHour; hour <= config.endHour; hour++) {
		const maxMinutes = hour === config.endHour ? 0 : 60; // Only add the final hour slot, not beyond
		for (let minute = 0; minute < maxMinutes; minute += config.timeSlotDuration) {
			const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
			slots.push(timeString);
		}
	}

	// Add the final end hour slot
	// slots.push(`${config.endHour.toString().padStart(2, '0')}:00`);

	return slots;
}

export function isTimeInRange(time: string, start: string, end: string): boolean {
	return time >= start && time <= end;
}

export function getAvailableTimeSlots(
	allocations: RoomAllocation[],
	selectedDay: string,
	settings?: GlobalSettings
): TimeSlot[] {
	const allSlots = generateTimeSlots(settings);
	const dayAllocations = allocations?.filter((allocation) => allocation.day === selectedDay);

	return allSlots.map((slot, index) => {
		// For the last slot, there's no "next slot", so we use it as both start and end
		const nextSlot = index < allSlots.length - 1 ? allSlots[index + 1] : slot;
		const isAvailable = !dayAllocations?.some((allocation) => isTimeInRange(slot, allocation.from, allocation.to));

		return {
			start: slot,
			end: nextSlot,
			available: isAvailable,
		};
	});
}

export function formatTime(time: string): string {
	const [hours, minutes] = time.split(':');
	const hour = Number.parseInt(hours);
	const ampm = hour >= 12 ? 'PM' : 'AM';
	const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
	return `${displayHour}:${minutes} ${ampm}`;
}
