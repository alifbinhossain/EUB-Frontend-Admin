'use client';

import { useCallback, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { DAYS_OF_WEEK, type TimeSlot } from '../_config/types';
import { generateTimeSlots } from '../_config/utils/time-utils';
import { TimeSlotComponent } from './time-slot';

interface WeeklyScheduleProps {
	roomId: string;
	onSlotsChange: (slots: TimeSlot[]) => void;
}

export function WeeklySchedule({ roomId, onSlotsChange }: WeeklyScheduleProps) {
	const [timeSlots, setTimeSlots] = useState<Record<string, TimeSlot[]>>(() => {
		const initialSlots: Record<string, TimeSlot[]> = {};
		DAYS_OF_WEEK.forEach((day) => {
			initialSlots[day.full] = generateTimeSlots(day.full);
		});
		return initialSlots;
	});

	const [isDragging, setIsDragging] = useState(false);
	const [dragStartSlot, setDragStartSlot] = useState<string | null>(null);

	const getAllSelectedSlots = useCallback(() => {
		const allSlots: TimeSlot[] = [];
		Object.values(timeSlots).forEach((daySlots) => {
			allSlots.push(...daySlots.filter((slot) => slot.isSelected));
		});
		return allSlots;
	}, [timeSlots]);

	const updateSlots = useCallback(
		(updatedSlots: Record<string, TimeSlot[]>) => {
			setTimeSlots(updatedSlots);
			const selectedSlots = Object.values(updatedSlots)
				.flat()
				.filter((slot) => slot.isSelected);
			onSlotsChange(selectedSlots);
		},
		[onSlotsChange]
	);

	const handleSlotSelect = useCallback(
		(slotId: string) => {
			const updatedSlots = { ...timeSlots };

			for (const day of DAYS_OF_WEEK) {
				const slotIndex = updatedSlots[day.full].findIndex((slot) => slot.id === slotId);
				if (slotIndex !== -1) {
					updatedSlots[day.full][slotIndex] = {
						...updatedSlots[day.full][slotIndex],
						isSelected: true,
					};
					break;
				}
			}

			updateSlots(updatedSlots);
		},
		[timeSlots, updateSlots]
	);

	const handleSlotDeselect = useCallback(
		(slotId: string) => {
			const updatedSlots = { ...timeSlots };

			for (const day of DAYS_OF_WEEK) {
				const slotIndex = updatedSlots[day.full].findIndex((slot) => slot.id === slotId);
				if (slotIndex !== -1) {
					updatedSlots[day.full][slotIndex] = {
						...updatedSlots[day.full][slotIndex],
						isSelected: false,
					};
					break;
				}
			}

			updateSlots(updatedSlots);
		},
		[timeSlots, updateSlots]
	);

	const handleSlotDelete = useCallback(
		(slotId: string) => {
			handleSlotDeselect(slotId);
		},
		[handleSlotDeselect]
	);

	const handleMouseDown = useCallback(
		(slotId: string) => {
			setIsDragging(true);
			setDragStartSlot(slotId);
			handleSlotSelect(slotId);
		},
		[handleSlotSelect]
	);

	const handleMouseEnter = useCallback(
		(slotId: string) => {
			if (isDragging && dragStartSlot) {
				handleSlotSelect(slotId);
			}
		},
		[isDragging, dragStartSlot, handleSlotSelect]
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
		setDragStartSlot(null);
	}, []);

	// Regenerate slots when room changes
	const handleRoomChange = useCallback(() => {
		const newSlots: Record<string, TimeSlot[]> = {};
		DAYS_OF_WEEK.forEach((day) => {
			newSlots[day.full] = generateTimeSlots(day.full);
		});
		updateSlots(newSlots);
	}, [updateSlots]);

	// Effect to handle room changes
	useState(() => {
		handleRoomChange();
	});

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>Weekly Schedule</CardTitle>
				<p className='text-sm text-muted-foreground'>
					Drag to select multiple time slots. Click individual slots to select/deselect.
				</p>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-8 gap-2'>
					{/* Header row */}
					<div className='p-2 text-sm font-medium'>Day</div>
					{Array.from({ length: 17 }, (_, i) => {
						const hour = Math.floor(i / 2) + 9;
						const minute = i % 2 === 0 ? '00' : '30';
						const nextHour = minute === '30' ? hour + 1 : hour;
						const nextMinute = minute === '30' ? '00' : '30';
						return (
							<div key={i} className='p-1 text-center text-xs font-medium'>
								{`${hour.toString().padStart(2, '0')}:${minute}`}
								<br />
								{`${nextHour.toString().padStart(2, '0')}:${nextMinute}`}
							</div>
						);
					})}

					{/* Schedule rows */}
					{DAYS_OF_WEEK.map((day) => (
						<div key={day.full} className='contents'>
							<div className='flex items-center p-2 text-sm font-medium'>{day.short}</div>
							{timeSlots[day.full]?.map((slot) => (
								<TimeSlotComponent
									key={slot.id}
									slot={slot}
									onSelect={handleSlotSelect}
									onDeselect={handleSlotDeselect}
									onDelete={handleSlotDelete}
									isDragging={isDragging}
									onMouseDown={handleMouseDown}
									onMouseEnter={handleMouseEnter}
									onMouseUp={handleMouseUp}
								/>
							))}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
