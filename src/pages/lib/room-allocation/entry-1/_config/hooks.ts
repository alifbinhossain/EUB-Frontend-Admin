import type React from 'react';
import { useCallback, useMemo } from 'react';

import type { SelectedSlot, Slot, TimeSlot } from './types';

interface UseSlotOperationsProps {
	slots: Slot[];
	selectedSlots: SelectedSlot[];
	timeSlots: TimeSlot[];
	setSlots: React.Dispatch<React.SetStateAction<Slot[]>>;
	setSelectedSlots: React.Dispatch<React.SetStateAction<SelectedSlot[]>>;
}

export function useSlotOperations({
	slots,
	selectedSlots,
	timeSlots,
	setSlots,
	setSelectedSlots,
}: UseSlotOperationsProps) {
	const slotLookup = useMemo(() => {
		const lookup = new Map<string, Slot>();
		slots.forEach((slot) => {
			lookup.set(`${slot.day}-${slot.timeSlotId}`, slot);
		});
		return lookup;
	}, [slots]);

	const selectedSlotsLookup = useMemo(() => {
		const lookup = new Set<string>();
		selectedSlots.forEach((slot) => {
			lookup.add(`${slot.day}-${slot.timeSlotId}`);
		});
		return lookup;
	}, [selectedSlots]);

	const getSlotForDayAndTime = useCallback(
		(day: string, timeSlotId: string) => {
			return slotLookup.get(`${day}-${timeSlotId}`);
		},
		[slotLookup]
	);

	const isSlotSelected = useCallback(
		(day: string, timeSlotId: string) => {
			return selectedSlotsLookup.has(`${day}-${timeSlotId}`);
		},
		[selectedSlotsLookup]
	);

	const handleSlotClick = useCallback(
		(day: string, timeSlotId: string) => {
			const slot = getSlotForDayAndTime(day, timeSlotId);
			if (!slot || slot.status === 'reserved') return;

			const timeSlot = timeSlots.find((ts) => ts.id === timeSlotId);
			if (!timeSlot) return;

			const isSelected = isSlotSelected(day, timeSlotId);

			if (isSelected) {
				setSelectedSlots((prev) => prev.filter((s) => !(s.day === day && s.timeSlotId === timeSlotId)));
			} else {
				setSelectedSlots((prev) => [
					...prev,
					{
						id: slot.id,
						day,
						timeSlotId,
						timeLabel: timeSlot.label,
					},
				]);
			}
		},
		[getSlotForDayAndTime, isSlotSelected, timeSlots, setSelectedSlots]
	);

	const handleEditSlot = useCallback((day: string, timeSlotId: string) => {}, []);

	const handleDeleteSlot = useCallback(
		(day: string, timeSlotId: string) => {
			setSlots((prev) =>
				prev.map((slot) => {
					if (slot.day === day && slot.timeSlotId === timeSlotId) {
						return { ...slot, status: 'available' as const, assignedTo: undefined, section: undefined };
					}
					return slot;
				})
			);
		},
		[setSlots]
	);

	return {
		getSlotForDayAndTime,
		isSlotSelected,
		handleSlotClick,
		handleEditSlot,
		handleDeleteSlot,
	};
}
