'use client';

import { useCallback, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DAYS_OF_WEEK, TIME_SLOTS, type BookingInfo, type TimeSlot } from '../_config/types';
import { generateScheduleData } from '../_config/utils/schedule-utils';
import { BookingDialog } from './booking-dialog';
import { ScheduleCell } from './schedule-cell';

interface ScheduleTableProps {
	roomId: string;
	onSlotsChange: (slots: TimeSlot[]) => void;
}

export function ScheduleTable({ roomId, onSlotsChange }: ScheduleTableProps) {
	const [scheduleData, setScheduleData] = useState(() => generateScheduleData());
	const [isDragging, setIsDragging] = useState(false);
	const [dragStartSlot, setDragStartSlot] = useState<string | null>(null);
	const [bookingDialog, setBookingDialog] = useState<{
		open: boolean;
		slot: TimeSlot | null;
		mode: 'add' | 'edit';
	}>({
		open: false,
		slot: null,
		mode: 'add',
	});

	// const { toast } = useToast();

	const updateScheduleData = useCallback(
		(newData: Record<string, TimeSlot[]>) => {
			setScheduleData(newData);
			const selectedSlots = Object.values(newData)
				.flat()
				.filter((slot) => slot.isSelected);
			onSlotsChange(selectedSlots);
		},
		[onSlotsChange]
	);

	const getSlotByDayAndTime = useCallback(
		(day: string, timeIndex: number): TimeSlot | undefined => {
			return scheduleData[day]?.[timeIndex];
		},
		[scheduleData]
	);

	const handleToggleSelect = useCallback(
		(slotId: string) => {
			const newData = { ...scheduleData };

			// Find and toggle the slot
			for (const day of DAYS_OF_WEEK) {
				const daySlots = newData[day.full];
				const slotIndex = daySlots.findIndex((slot) => slot.id === slotId);
				if (slotIndex !== -1) {
					daySlots[slotIndex] = {
						...daySlots[slotIndex],
						isSelected: !daySlots[slotIndex].isSelected,
					};
					break;
				}
			}

			updateScheduleData(newData);
		},
		[scheduleData, updateScheduleData]
	);

	const handleAddBooking = useCallback((slot: TimeSlot) => {
		setBookingDialog({
			open: true,
			slot,
			mode: 'add',
		});
	}, []);

	const handleEditBooking = useCallback((slot: TimeSlot) => {
		setBookingDialog({
			open: true,
			slot,
			mode: 'edit',
		});
	}, []);

	const handleDeleteBooking = useCallback(
		(slot: TimeSlot) => {
			const newData = { ...scheduleData };

			// Find and delete the booking
			for (const day of DAYS_OF_WEEK) {
				const daySlots = newData[day.full];
				const slotIndex = daySlots.findIndex((s) => s.id === slot.id);
				if (slotIndex !== -1) {
					daySlots[slotIndex] = {
						...daySlots[slotIndex],
						isAvailable: true,
						assignedTo: undefined,
						booking: undefined,
					};
					break;
				}
			}

			updateScheduleData(newData);
			// toast({
			// 	title: 'Booking deleted',
			// 	description: `Booking for ${slot.day} ${slot.startTime}-${slot.endTime} has been deleted.`,
			// });
		},
		[scheduleData, updateScheduleData]
	);

	const handleSaveBooking = useCallback(
		(bookingInfo: BookingInfo) => {
			const newData = { ...scheduleData };

			// Find and update the slot
			for (const day of DAYS_OF_WEEK) {
				const daySlots = newData[day.full];
				const slotIndex = daySlots.findIndex(
					(s) => s.day === bookingInfo.day && s.startTime === bookingInfo.startTime
				);
				if (slotIndex !== -1) {
					daySlots[slotIndex] = {
						...daySlots[slotIndex],
						isAvailable: false,
						assignedTo: bookingInfo.assignedTo,
						booking: bookingInfo,
						isSelected: false, // Deselect if it was selected
					};
					break;
				}
			}

			updateScheduleData(newData);
			// toast({
			// 	title: bookingDialog.mode === 'add' ? 'Booking added' : 'Booking updated',
			// 	description: `${bookingInfo.title} has been ${bookingDialog.mode === 'add' ? 'added' : 'updated'} for ${bookingInfo.day} ${bookingInfo.startTime}-${bookingInfo.endTime}.`,
			// });
		},
		[scheduleData, updateScheduleData]
	);

	const handleMouseDown = useCallback((slotId: string) => {
		setIsDragging(true);
		setDragStartSlot(slotId);
	}, []);

	const handleMouseEnter = useCallback(
		(slotId: string) => {
			if (isDragging && dragStartSlot) {
				const newData = { ...scheduleData };

				// Select the slot if it's available and not already selected
				for (const day of DAYS_OF_WEEK) {
					const daySlots = newData[day.full];
					const slotIndex = daySlots.findIndex((slot) => slot.id === slotId);
					if (slotIndex !== -1 && daySlots[slotIndex].isAvailable && !daySlots[slotIndex].isSelected) {
						daySlots[slotIndex] = {
							...daySlots[slotIndex],
							isSelected: true,
						};
						updateScheduleData(newData);
						break;
					}
				}
			}
		},
		[isDragging, dragStartSlot, scheduleData, updateScheduleData]
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
		setDragStartSlot(null);
	}, []);

	// Regenerate schedule when room changes
	const handleRoomChange = useCallback(() => {
		const newData = generateScheduleData();
		updateScheduleData(newData);
	}, [updateScheduleData]);

	// Effect to handle room changes
	useState(() => {
		handleRoomChange();
	});

	return (
		<>
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>Weekly Schedule</CardTitle>
					<p className='text-sm text-muted-foreground'>
						Click to select available slots or drag to select multiple. Hover over available slots to see
						the + button for adding bookings.
					</p>
				</CardHeader>
				<CardContent>
					<div className='max-h-[600px] overflow-auto border border-secondary/10'>
						<Table className='relative'>
							<TableHeader className='bg-gradient sticky left-0 right-0 top-0 z-20'>
								<TableRow>
									<TableHead className='w-[100px] border-r text-center font-semibold'>Time</TableHead>
									{DAYS_OF_WEEK.map((day) => (
										<TableHead
											key={day.full}
											className='w-[140px] !border-r text-center font-semibold'
										>
											<div className='flex flex-col'>
												<span className='text-sm'>{day.short.toUpperCase()}</span>
											</div>
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{TIME_SLOTS.map((timeSlot, timeIndex) => (
									<TableRow
										key={`${timeSlot.start}-${timeSlot.end}`}
										className='group h-8 hover:bg-transparent'
									>
										<TableCell className='bg-white text-center text-xs font-medium'>
											{timeSlot.display}
										</TableCell>
										{DAYS_OF_WEEK.map((day) => {
											const slot = getSlotByDayAndTime(day.full, timeIndex);
											return slot ? (
												<ScheduleCell
													key={slot.id}
													slot={slot}
													onToggleSelect={handleToggleSelect}
													onAddBooking={handleAddBooking}
													onEditBooking={handleEditBooking}
													onDeleteBooking={handleDeleteBooking}
													isDragging={isDragging}
													onMouseDown={handleMouseDown}
													onMouseEnter={handleMouseEnter}
													onMouseUp={handleMouseUp}
												/>
											) : (
												<TableCell
													key={`${day.full}-${timeIndex}`}
													className='h-8 border border-border'
												/>
											);
										})}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			<BookingDialog
				open={bookingDialog.open}
				onOpenChange={(open) => setBookingDialog({ ...bookingDialog, open })}
				slot={bookingDialog.slot}
				mode={bookingDialog.mode}
				onSave={handleSaveBooking}
			/>
		</>
	);
}
