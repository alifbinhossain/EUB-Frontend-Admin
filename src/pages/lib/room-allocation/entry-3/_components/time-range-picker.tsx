'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Clock, Filter, RotateCcw, Settings } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';

import type { GlobalSettings } from '../hooks/use-global-settings';
import { formatTime, getAvailableTimeSlots } from '../lib/time-utils';
import type { Room, RoomAllocation, TimeSlot, Weekday } from '../lib/types';
import { AssignmentDialog } from './assignment-dialog';
import { DurationInputDialog } from './duration-input-dialog';

interface TimeRangePickerProps {
	allocations: RoomAllocation[];
	selectedDay: string;
	onTimeRangeSelect: (from: string, to: string) => void;
	room: Room | null;
	day: Weekday | null;
	semesterId: string;
	onAssignment: () => Promise<void>;
	globalSettings?: GlobalSettings;
}

type FilterTab = 'all' | 'available' | 'taken';

export function TimeRangePicker({
	allocations,
	selectedDay,
	onTimeRangeSelect,
	room,
	day,
	semesterId,
	onAssignment,
	globalSettings,
}: TimeRangePickerProps) {
	const [selectedStart, setSelectedStart] = useState<string | null>(null);
	const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
	const [selectionError, setSelectionError] = useState<string | null>(null);
	const [showAssignDialog, setShowAssignDialog] = useState(false);
	const [showDurationDialog, setShowDurationDialog] = useState(false);
	const [actualEndTime, setActualEndTime] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState<FilterTab>('all');
	const [customDuration, setCustomDuration] = useState<number | null>(null);
	const [pendingStartTime, setPendingStartTime] = useState<string | null>(null);

	useEffect(() => {
		setSelectedStart(null);
		setSelectedEnd(null);
		setSelectionError(null);
		setCustomDuration(null);
		setPendingStartTime(null);
		setActualEndTime(null);
		setShowAssignDialog(false);
		setShowDurationDialog(false);
	}, [selectedDay]);

	const timeSlots = useMemo(
		() => getAvailableTimeSlots(allocations, selectedDay, globalSettings),
		[allocations, selectedDay, globalSettings]
	);

	// Memoized filtered time slots
	const filteredTimeSlots = useMemo(() => {
		switch (activeTab) {
			case 'available':
				return timeSlots.filter((slot) => slot.available);
			case 'taken':
				return timeSlots.filter((slot) => !slot.available);
			default:
				return timeSlots;
		}
	}, [timeSlots, activeTab]);

	// Memoized slot counts
	const slotCounts = useMemo(() => {
		const available = timeSlots.filter((slot) => slot.available).length;
		const taken = timeSlots.length - available;
		return { all: timeSlots.length, available, taken };
	}, [timeSlots]);

	// Check if there are any available slots after the given start time
	const hasAvailableEndSlots = useCallback(
		(startTime: string): boolean => {
			const startIndex = timeSlots.findIndex((slot) => slot.start === startTime);
			if (startIndex === -1) return false;

			// Check if there are any available slots after the start time
			for (let i = startIndex + 1; i < timeSlots.length; i++) {
				if (timeSlots[i].available) return true;
			}
			return false;
		},
		[timeSlots]
	);

	// Calculate end time based on duration
	const calculateEndTimeFromDuration = useCallback((startTime: string, durationMinutes: number): string => {
		const [hours, minutes] = startTime.split(':').map(Number);
		const totalMinutes = hours * 60 + minutes + durationMinutes;
		const endHours = Math.floor(totalMinutes / 60) % 24; // Handle overflow
		const endMins = totalMinutes % 60;
		return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
	}, []);

	// Memoized range validation
	const isValidRange = useCallback(
		(start: string, end: string): boolean => {
			const startIndex = timeSlots.findIndex((slot) => slot.start === start);
			const endIndex = timeSlots.findIndex((slot) => slot.start === end);

			if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) return false;

			for (let i = startIndex; i < endIndex; i++) {
				if (!timeSlots[i].available) return false;
			}
			return true;
		},
		[timeSlots]
	);

	// Optimized duration calculation
	const calculateDuration = useCallback((start: string, end: string): string => {
		const [startHour, startMin] = start.split(':').map(Number);
		const [endHour, endMin] = end.split(':').map(Number);
		let diffMinutes = endHour * 60 + endMin - (startHour * 60 + startMin);

		// Handle next day scenarios
		if (diffMinutes < 0) {
			diffMinutes += 24 * 60;
		}

		const hours = Math.floor(diffMinutes / 60);
		const minutes = diffMinutes % 60;

		if (hours === 0) return `${minutes}m`;
		if (minutes === 0) return `${hours}h`;
		return `${hours}h ${minutes}m`;
	}, []);

	// Handle duration confirmation from dialog
	const handleDurationConfirm = useCallback(
		(durationMinutes: number) => {
			if (pendingStartTime) {
				const endTime = calculateEndTimeFromDuration(pendingStartTime, durationMinutes);
				setSelectedStart(pendingStartTime);
				setSelectedEnd(pendingStartTime); // Set to start time for display
				setActualEndTime(endTime);
				setCustomDuration(durationMinutes);
				onTimeRangeSelect(pendingStartTime, endTime);
				setPendingStartTime(null);
			}
		},
		[pendingStartTime, calculateEndTimeFromDuration, onTimeRangeSelect]
	);

	const handleSlotClick = useCallback(
		(slot: TimeSlot) => {
			if (!slot.available) return;

			setSelectionError(null);
			setCustomDuration(null);

			if (!selectedStart) {
				// First selection - set start time
				if (!hasAvailableEndSlots(slot.start)) {
					setPendingStartTime(slot.start);
					setShowDurationDialog(true);
				} else {
					setSelectedStart(slot.start);
					setSelectedEnd(null);
				}
			} else if (!selectedEnd) {
				// Second selection - try to set end time
				if (slot.start <= selectedStart) {
					if (!hasAvailableEndSlots(slot.start)) {
						setPendingStartTime(slot.start);
						setShowDurationDialog(true);
					} else {
						setSelectedStart(slot.start);
						setSelectedEnd(null);
					}
				} else {
					// Use the selected slot time directly as end time
					const actualEndTime = slot.start;

					if (isValidRange(selectedStart, slot.start)) {
						setSelectedEnd(slot.start);
						setActualEndTime(actualEndTime);
						onTimeRangeSelect(selectedStart, actualEndTime);
					} else {
						setSelectionError('Cannot select a range that includes taken time slots');
						if (!hasAvailableEndSlots(slot.start)) {
							setPendingStartTime(slot.start);
							setShowDurationDialog(true);
						} else {
							setSelectedStart(slot.start);
							setSelectedEnd(null);
							setActualEndTime(null);
						}
					}
				}
			} else {
				// Already have a complete selection, start new selection
				if (!hasAvailableEndSlots(slot.start)) {
					setPendingStartTime(slot.start);
					setShowDurationDialog(true);
				} else {
					setSelectedStart(slot.start);
					setSelectedEnd(null);
				}
			}
		},
		[selectedStart, selectedEnd, timeSlots, isValidRange, onTimeRangeSelect, hasAvailableEndSlots]
	);

	const clearSelection = useCallback(() => {
		setSelectedStart(null);
		setSelectedEnd(null);
		setSelectionError(null);
		setCustomDuration(null);
		setPendingStartTime(null);
	}, []);

	const getSlotState = useCallback(
		(slot: TimeSlot) => {
			if (!slot.available) return 'taken';
			if (selectedStart && selectedEnd && slot.start >= selectedStart && slot.start <= selectedEnd)
				return 'selected';
			if (slot.start === selectedStart) return 'start';
			if (selectedStart && !selectedEnd && slot.start > selectedStart && isValidRange(selectedStart, slot.start))
				return 'selectable';
			if (selectedStart && !selectedEnd && slot.start > selectedStart) return 'blocked';
			return 'available';
		},
		[selectedStart, selectedEnd, isValidRange]
	);

	const renderTimeSlots = useCallback(
		(slots: TimeSlot[]) => {
			if (slots.length === 0) {
				return (
					<div className='col-span-6 flex flex-col items-center justify-center py-12 text-muted-foreground'>
						<Filter className='mb-2 h-6 w-6 opacity-50' />
						<p className='text-sm font-medium'>No slots available</p>
					</div>
				);
			}

			return slots.map((slot, index) => {
				const state = getSlotState(slot);

				return (
					<Button
						key={`${slot.start}-${index}`}
						variant='outline'
						size='sm'
						className={cn(
							'h-12 border-2 text-xs font-medium transition-all duration-150',
							// Base styles
							'relative flex flex-col items-center justify-center',
							// Available slots
							state === 'available' && 'border-slate-200 text-slate-700 hover:bg-slate-50',
							// Taken slots
							state === 'taken' &&
								'cursor-not-allowed border-red-200 bg-red-50 text-red-700 opacity-75 hover:bg-red-50',
							// Start time
							state === 'start' &&
								'border-blue-600 bg-blue-600 text-white shadow-md ring-2 ring-blue-200',
							// Selected range
							state === 'selected' && 'border-emerald-600 bg-emerald-600 text-white shadow-sm',
							// Selectable end times
							state === 'selectable' &&
								'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-sm hover:bg-emerald-100',
							// Blocked
							state === 'blocked' && 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-30'
						)}
						onClick={() => handleSlotClick(slot)}
						disabled={state === 'taken' || state === 'blocked'}
					>
						<span className='leading-none'>{formatTime(slot.start)}</span>
						{state === 'taken' && <span className='mt-0.5 text-[10px] opacity-75'>Taken</span>}
						{state === 'start' && <span className='mt-0.5 text-[10px] opacity-90'>Start</span>}
						{state === 'selectable' && selectedStart && !selectedEnd && (
							<span className='mt-0.5 text-[10px] font-medium'>Select</span>
						)}
					</Button>
				);
			});
		},
		[getSlotState, handleSlotClick, selectedStart, selectedEnd]
	);

	return (
		<Card className='border-slate-200 shadow-sm'>
			<CardHeader className='pb-4'>
				<div className='flex items-center justify-between'>
					<div className='space-y-1'>
						<CardTitle className='flex items-center gap-2 text-lg text-slate-800'>
							<Clock className='h-4 w-4' />
							Time Selection
						</CardTitle>
						<CardDescription className='text-sm text-slate-600'>
							{!selectedStart
								? 'Select your start time'
								: !selectedEnd
									? 'Now select your end time'
									: customDuration
										? 'Custom duration set'
										: 'Selection complete'}
						</CardDescription>
					</div>
					{selectedStart && (
						<Button variant='outline' size='sm' onClick={clearSelection} className='h-8 px-3'>
							<RotateCcw className='mr-1 h-3 w-3' />
							Reset
						</Button>
					)}
				</div>

				{selectionError && (
					<div className='flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3'>
						<AlertTriangle className='h-4 w-4 flex-shrink-0 text-red-600' />
						<span className='text-sm font-medium text-red-800'>{selectionError}</span>
					</div>
				)}

				{selectedStart && selectedEnd && (
					<div className='flex items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-3'>
						<CheckCircle2 className='h-4 w-4 flex-shrink-0 text-emerald-600' />
						<div className='min-w-0 flex-1'>
							<div className='flex items-center gap-2 text-sm font-medium text-emerald-800'>
								<span>{formatTime(selectedStart)}</span>
								<ArrowRight className='h-3 w-3' />
								<span>{formatTime(actualEndTime || selectedEnd)}</span>
							</div>
							<div className='mt-0.5 flex items-center gap-2 text-xs text-emerald-700'>
								Duration: {calculateDuration(selectedStart, actualEndTime || selectedEnd)}
								{customDuration && (
									<Badge
										variant='secondary'
										className='h-4 bg-blue-100 px-1.5 text-[10px] text-blue-700'
									>
										<Settings className='mr-1 h-2.5 w-2.5' />
										Custom
									</Badge>
								)}
							</div>
						</div>
					</div>
				)}

				{selectedStart && !selectedEnd && !customDuration && (
					<div className='flex items-center gap-3 rounded-md border border-blue-200 bg-blue-50 p-3'>
						<Clock className='h-4 w-4 flex-shrink-0 text-blue-600' />
						<div className='flex-1'>
							<div className='text-sm font-medium text-blue-800'>Start: {formatTime(selectedStart)}</div>
							<div className='mt-0.5 text-xs text-blue-700'>
								Select an end time from the highlighted slots
							</div>
						</div>
					</div>
				)}
			</CardHeader>

			<CardContent className='pt-0'>
				<Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as FilterTab)} className='w-full'>
					<TabsList className='grid h-9 w-full grid-cols-3 bg-slate-100 p-1'>
						<TabsTrigger value='all' className='h-7 text-xs font-medium data-[state=active]:bg-white'>
							All
							<Badge
								variant='secondary'
								className='ml-1.5 h-4 bg-slate-200 px-1.5 text-[10px] text-slate-700'
							>
								{slotCounts.all}
							</Badge>
						</TabsTrigger>
						<TabsTrigger value='available' className='h-7 text-xs font-medium data-[state=active]:bg-white'>
							Available
							<Badge
								variant='secondary'
								className='ml-1.5 h-4 bg-emerald-100 px-1.5 text-[10px] text-emerald-700'
							>
								{slotCounts.available}
							</Badge>
						</TabsTrigger>
						<TabsTrigger value='taken' className='h-7 text-xs font-medium data-[state=active]:bg-white'>
							Taken
							<Badge
								variant='secondary'
								className='ml-1.5 h-4 bg-red-100 px-1.5 text-[10px] text-red-700'
							>
								{slotCounts.taken}
							</Badge>
						</TabsTrigger>
					</TabsList>

					<div className='mt-4'>
						<TabsContent value='all' className='mt-0'>
							<div className='grid max-h-80 grid-cols-6 gap-1.5 overflow-y-auto p-1'>
								{renderTimeSlots(filteredTimeSlots)}
							</div>
						</TabsContent>

						<TabsContent value='available' className='mt-0'>
							<div className='grid max-h-80 grid-cols-6 gap-1.5 overflow-y-auto p-1'>
								{renderTimeSlots(filteredTimeSlots)}
							</div>
						</TabsContent>

						<TabsContent value='taken' className='mt-0'>
							<div className='grid max-h-80 grid-cols-6 gap-1.5 overflow-y-auto p-1'>
								{renderTimeSlots(filteredTimeSlots)}
							</div>
							{activeTab === 'taken' && filteredTimeSlots.length > 0 && (
								<div className='mt-3 rounded-md border border-red-200 bg-red-50 p-2.5'>
									<p className='text-xs text-red-800'>
										<strong>Note:</strong> These slots are occupied and cannot be selected.
									</p>
								</div>
							)}
						</TabsContent>
					</div>
				</Tabs>

				<div className='mt-4 space-y-3'>
					<div className='flex items-center justify-between text-xs'>
						<div className='flex items-center gap-4'>
							<div className='flex items-center gap-1.5'>
								<div className='h-3 w-3 rounded border-2 border-slate-200 bg-white'></div>
								<span className='text-slate-600'>Available</span>
							</div>
							<div className='flex items-center gap-1.5'>
								<div className='h-3 w-3 rounded border border-red-200 bg-red-50'></div>
								<span className='text-slate-600'>Taken</span>
							</div>
							<div className='flex items-center gap-1.5'>
								<div className='h-3 w-3 rounded bg-blue-600'></div>
								<span className='text-slate-600'>Start</span>
							</div>
							<div className='flex items-center gap-1.5'>
								<div className='h-3 w-3 rounded border border-emerald-300 bg-emerald-50'></div>
								<span className='text-slate-600'>Selectable</span>
							</div>
						</div>
					</div>

					{selectedStart && selectedEnd && room && day && (
						<Button onClick={() => setShowAssignDialog(true)} className='h-10 w-full font-medium'>
							Assign Room
						</Button>
					)}

					{/* Duration Input Dialog */}
					<DurationInputDialog
						open={showDurationDialog}
						onOpenChange={setShowDurationDialog}
						startTime={pendingStartTime || ''}
						onConfirm={handleDurationConfirm}
						defaultDuration={10}
					/>

					{room && day && selectedStart && actualEndTime && (
						<AssignmentDialog
							open={showAssignDialog}
							onOpenChange={setShowAssignDialog}
							room={room}
							day={day}
							startTime={selectedStart}
							endTime={actualEndTime}
							semesterId={semesterId}
							onConfirm={onAssignment}
						/>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
