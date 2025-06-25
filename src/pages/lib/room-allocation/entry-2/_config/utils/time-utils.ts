export function formatTimeSlot(startTime: string, endTime: string): string {
	return `${startTime} - ${endTime}`;
}

export function generateTimeSlots(day: string): Array<{
	id: string;
	day: string;
	startTime: string;
	endTime: string;
	isAvailable: boolean;
	isSelected: boolean;
	assignedTo?: string;
}> {
	const slots = [];
	const timeSlots = [
		'09:00',
		'09:30',
		'10:00',
		'10:30',
		'11:00',
		'11:30',
		'12:00',
		'12:30',
		'13:00',
		'13:30',
		'14:00',
		'14:30',
		'15:00',
		'15:30',
		'16:00',
		'16:30',
		'17:00',
		'17:30',
	];

	for (let i = 0; i < timeSlots.length - 1; i++) {
		const startTime = timeSlots[i];
		const endTime = timeSlots[i + 1];

		// Simulate some pre-allocated slots
		const isAvailable = Math.random() > 0.3;
		const assignedTo = !isAvailable ? `SEC-${Math.floor(Math.random() * 4) + 1}` : undefined;

		slots.push({
			id: `${day}-${startTime}-${endTime}`,
			day,
			startTime,
			endTime,
			isAvailable,
			isSelected: false,
			assignedTo,
		});
	}

	return slots;
}

export function isTimeSlotInRange(slotStart: string, slotEnd: string, rangeStart: string, rangeEnd: string): boolean {
	return slotStart >= rangeStart && slotEnd <= rangeEnd;
}
