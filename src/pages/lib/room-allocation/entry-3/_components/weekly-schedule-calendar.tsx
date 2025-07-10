'use client';

import { useMemo, useRef } from 'react';
import { AlertCircle, Calendar, Clock, Maximize2, Minimize2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { useFullscreen } from '../hooks/use-fullscreen';
import type { GlobalSettings } from '../hooks/use-global-settings';
import { formatTime } from '../lib/time-utils';
import type { RoomAllocation, Weekday } from '../lib/types';

interface WeeklyScheduleCalendarProps {
	allocations: RoomAllocation[];
	roomName?: string;
	globalSettings?: GlobalSettings;
}

const WEEKDAYS: { key: Weekday; label: string }[] = [
	{ key: 'sun', label: 'SUN' },
	{ key: 'mon', label: 'MON' },
	{ key: 'tue', label: 'TUE' },
	{ key: 'wed', label: 'WED' },
	{ key: 'thu', label: 'THU' },
	{ key: 'fri', label: 'FRI' },
	{ key: 'sat', label: 'SAT' },
];

const WEEKDAYS_FULL: { key: Weekday; label: string }[] = [
	{ key: 'sun', label: 'SUNDAY' },
	{ key: 'mon', label: 'MONDAY' },
	{ key: 'tue', label: 'TUESDAY' },
	{ key: 'wed', label: 'WEDNESDAY' },
	{ key: 'thu', label: 'THURSDAY' },
	{ key: 'fri', label: 'FRIDAY' },
	{ key: 'sat', label: 'SATURDAY' },
];

// Generate time slots from settings
const generateTimeSlots = (settings?: GlobalSettings): string[] => {
	const config = settings || { timeSlotDuration: 10, startHour: 9, endHour: 19 };
	const slots: string[] = [];

	for (let hour = config.startHour; hour <= config.endHour; hour++) {
		const maxMinutes = hour === config.endHour ? 0 : 60;
		for (let minute = 0; minute < maxMinutes; minute += config.timeSlotDuration) {
			const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
			slots.push(timeString);
		}
	}
	return slots;
};

interface ScheduleBlock {
	allocation: RoomAllocation;
	startSlot: number;
	duration: number;
	hasConflict?: boolean;
}

export function WeeklyScheduleCalendar({ allocations, roomName, globalSettings }: WeeklyScheduleCalendarProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { isFullscreen, isSupported, toggleFullscreen } = useFullscreen();
	const timeSlots = useMemo(() => generateTimeSlots(globalSettings), [globalSettings]);

	// Use full day names in fullscreen mode
	const weekdaysToShow = isFullscreen ? WEEKDAYS_FULL : WEEKDAYS;

	// Process allocations into schedule blocks
	const scheduleData = useMemo(() => {
		const schedule: Record<Weekday, ScheduleBlock[]> = {
			sun: [],
			mon: [],
			tue: [],
			wed: [],
			thu: [],
			fri: [],
			sat: [],
		};

		// Group allocations by day and process them
		allocations.forEach((allocation) => {
			const startIndex = timeSlots.findIndex((slot) => slot === allocation.from);

			if (startIndex !== -1) {
				// Calculate duration in time slots
				let duration = 1; // Default to 1 slot
				const endIndex = timeSlots.findIndex((slot) => slot === allocation.to);

				if (endIndex !== -1) {
					duration = Math.max(1, endIndex - startIndex);
				} else {
					// If end time is not in our slots, calculate based on time difference
					const [startHour, startMin] = allocation.from.split(':').map(Number);
					const [endHour, endMin] = allocation.to.split(':').map(Number);
					const diffMinutes = endHour * 60 + endMin - (startHour * 60 + startMin);
					const slotDuration = globalSettings?.timeSlotDuration || 10;
					duration = Math.max(1, Math.ceil(diffMinutes / slotDuration));
				}

				const block: ScheduleBlock = {
					allocation,
					startSlot: startIndex,
					duration: Math.min(duration, timeSlots.length - startIndex),
				};

				schedule[allocation.day].push(block);
			}
		});

		// Check for conflicts and sort by start time
		Object.keys(schedule).forEach((day) => {
			const daySchedule = schedule[day as Weekday];

			// Sort blocks by start time
			daySchedule.sort((a, b) => a.startSlot - b.startSlot);

			// Check for conflicts
			daySchedule.forEach((block, index) => {
				const hasOverlap = daySchedule.some((otherBlock, otherIndex) => {
					if (index === otherIndex) return false;
					const blockEnd = block.startSlot + block.duration;
					const otherBlockEnd = otherBlock.startSlot + otherBlock.duration;
					return (
						(block.startSlot < otherBlockEnd && blockEnd > otherBlock.startSlot) ||
						(otherBlock.startSlot < blockEnd && otherBlockEnd > block.startSlot)
					);
				});
				block.hasConflict = hasOverlap;
			});
		});

		return schedule;
	}, [allocations, timeSlots, globalSettings]);

	// Get allocation for a specific time slot and day
	const getAllocationAtSlot = (day: Weekday, slotIndex: number): ScheduleBlock | null => {
		const daySchedule = scheduleData[day] || [];
		return (
			daySchedule.find((block) => slotIndex >= block.startSlot && slotIndex < block.startSlot + block.duration) ||
			null
		);
	};

	// Check if a slot is the start of an allocation
	const isStartOfAllocation = (day: Weekday, slotIndex: number): boolean => {
		const daySchedule = scheduleData[day] || [];
		return daySchedule.some((block) => block.startSlot === slotIndex);
	};

	// Check if a slot should be hidden (part of a multi-slot booking but not the start)
	const shouldHideSlot = (day: Weekday, slotIndex: number): boolean => {
		const allocation = getAllocationAtSlot(day, slotIndex);
		return allocation !== null && !isStartOfAllocation(day, slotIndex);
	};

	const totalAllocations = allocations.length;
	const conflictCount = Object.values(scheduleData)
		.flat()
		.filter((block) => block.hasConflict).length;

	const handleFullscreenToggle = async () => {
		if (containerRef.current) {
			await toggleFullscreen(containerRef.current);
		}
	};

	// Dynamic sizing based on fullscreen state
	const cellHeight = isFullscreen ? 'h-12' : 'h-8';
	const blockHeightMultiplier = isFullscreen ? 48 : 32;
	const maxBlockHeight = isFullscreen ? 300 : 200;
	const timeColumnWidth = isFullscreen ? 'w-28 min-w-[112px]' : 'w-20 min-w-[80px]';
	const dayColumnWidth = isFullscreen ? 'min-w-[160px]' : 'min-w-[100px]';
	const textSize = isFullscreen ? 'text-sm' : 'text-xs';
	const headerTextSize = isFullscreen ? 'text-base' : 'text-sm';

	return (
		<div
			ref={containerRef}
			className={cn(
				'border-slate-200 shadow-sm transition-all duration-300',
				isFullscreen ? 'fixed inset-0 z-50 overflow-auto bg-white p-6' : 'rounded-lg border'
			)}
		>
			{/* Header */}
			<div className={cn('pb-4', isFullscreen ? 'mb-6 border-b border-slate-200' : 'p-6')}>
				<div className='flex items-center justify-between'>
					<div className='space-y-1'>
						<h2
							className={cn(
								'flex items-center gap-2 font-semibold text-slate-800',
								isFullscreen ? 'text-2xl' : 'text-lg'
							)}
						>
							<Calendar className={cn(isFullscreen ? 'h-6 w-6' : 'h-4 w-4')} />
							Weekly Schedule
							{roomName && (
								<span
									className={cn('font-normal text-slate-600', isFullscreen ? 'text-xl' : 'text-base')}
								>
									- {roomName}
								</span>
							)}
						</h2>
						<p className={cn('text-slate-600', isFullscreen ? 'text-base' : 'text-sm')}>
							{isFullscreen
								? 'Complete overview of all booked time slots across the week'
								: 'Overview of all booked time slots across the week'}
						</p>
					</div>
					<div className='flex items-center gap-3'>
						<Badge
							variant='secondary'
							className={cn('bg-slate-100 px-2 text-xs text-slate-700', isFullscreen ? 'h-7' : 'h-6')}
						>
							{totalAllocations} Bookings
						</Badge>
						{conflictCount > 0 && (
							<Badge variant='destructive' className={cn('px-2 text-xs', isFullscreen ? 'h-7' : 'h-6')}>
								<AlertCircle className='mr-1 h-3 w-3' />
								{conflictCount} Conflicts
							</Badge>
						)}
						{isSupported && (
							<Button
								variant='outline'
								size='sm'
								onClick={handleFullscreenToggle}
								className={cn('px-2 text-xs', isFullscreen ? 'h-7' : 'h-6')}
								title={isFullscreen ? 'Exit fullscreen' : 'View in fullscreen'}
							>
								{isFullscreen ? (
									<>
										<Minimize2 className='mr-1 h-3 w-3' />
										Exit Fullscreen
									</>
								) : (
									<>
										<Maximize2 className='mr-1 h-3 w-3' />
										Fullscreen
									</>
								)}
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* Table Container */}
			<div className={cn('pt-0', !isFullscreen && 'px-6 pb-6')}>
				<div className='overflow-hidden rounded-lg border border-slate-200'>
					<div className={cn('overflow-auto', isFullscreen ? 'max-h-[calc(100vh-200px)]' : 'max-h-96')}>
						<Table>
							<TableHeader className='sticky top-0 z-10'>
								<TableRow className='border-b border-slate-200 bg-slate-50 hover:bg-slate-50'>
									<TableHead
										className={cn(
											'sticky left-0 z-20 border-r border-slate-200 bg-slate-50 font-medium text-slate-700',
											timeColumnWidth,
											headerTextSize
										)}
									>
										Time
									</TableHead>
									{weekdaysToShow.map((day) => (
										<TableHead
											key={day.key}
											className={cn(
												'bg-slate-50 text-center font-medium text-slate-700',
												dayColumnWidth,
												headerTextSize
											)}
										>
											{day.label}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{timeSlots.map((timeSlot, slotIndex) => (
									<TableRow
										key={timeSlot}
										className={cn(
											'hover:bg-slate-25 border-b border-slate-100 transition-colors',
											cellHeight,
											slotIndex % 2 === 0 ? 'bg-white' : 'bg-slate-25'
										)}
									>
										{/* Time Column - Sticky */}
										<TableCell
											className={cn(
												'border-r border-slate-200 bg-inherit font-medium text-slate-600',
												timeColumnWidth,
												textSize,
												isFullscreen ? 'p-3' : 'p-2'
											)}
										>
											<div className='flex items-center'>
												<Clock
													className={cn(
														'mr-1.5 flex-shrink-0 text-slate-400',
														isFullscreen ? 'h-4 w-4' : 'h-3 w-3'
													)}
												/>
												<span className='truncate'>{formatTime(timeSlot)}</span>
											</div>
										</TableCell>

										{/* Day Columns */}
										{weekdaysToShow.map((day) => {
											const allocation = getAllocationAtSlot(day.key, slotIndex);
											const isStart = isStartOfAllocation(day.key, slotIndex);
											const shouldHide = shouldHideSlot(day.key, slotIndex);

											return (
												<TableCell
													key={`${day.key}-${slotIndex}`}
													className={cn(
														'relative bg-inherit',
														dayColumnWidth,
														isFullscreen ? 'p-2' : 'p-1'
													)}
												>
													{allocation && isStart && (
														<div
															className={cn(
																'absolute flex items-center justify-center overflow-hidden rounded-sm border px-1 font-medium shadow-sm transition-all',
																allocation.hasConflict
																	? 'border-red-300 bg-red-100 text-red-800'
																	: 'border-blue-300 bg-blue-100 text-blue-800',
																isFullscreen
																	? 'left-2 right-2 px-2 text-sm'
																	: 'left-1 right-1 text-xs',
																textSize
															)}
															style={{
																top: isFullscreen ? '4px' : '2px',
																height: `${Math.min(allocation.duration * blockHeightMultiplier - (isFullscreen ? 8 : 4), maxBlockHeight)}px`,
																zIndex: 5,
															}}
														>
															<div className='w-full text-center leading-tight'>
																<div
																	className={cn(
																		'truncate font-semibold uppercase tracking-wide',
																		isFullscreen ? 'mb-1 text-xs' : 'text-[10px]'
																	)}
																>
																	{allocation.allocation.course_code} -
																	{allocation.allocation.course_section}
																</div>
																<div
																	className={cn(
																		'truncate opacity-80',
																		isFullscreen
																			? 'mb-1 text-xs'
																			: 'mt-0.5 text-[9px]'
																	)}
																>
																	{allocation.allocation.teacher_name}
																</div>
																<div
																	className={cn(
																		'truncate opacity-70',
																		isFullscreen ? 'text-xs' : 'text-[9px]'
																	)}
																>
																	{formatTime(allocation.allocation.from)} -{' '}
																	{formatTime(allocation.allocation.to)}
																</div>
																<div
																	className={cn(
																		'truncate opacity-80',
																		isFullscreen
																			? 'mb-1 text-xs'
																			: 'mt-0.5 text-[9px]'
																	)}
																>
																	Duration:{' '}
																	{Math.round(
																		((allocation.duration *
																			(globalSettings?.timeSlotDuration || 10)) /
																			60) *
																			10
																	) / 10}
																	h
																</div>
																{/* {allocation.duration > 3 && (
																	<div className='mt-1 truncate text-xs opacity-60'>
																		Duration:{' '}
																		{Math.round(
																			((allocation.duration *
																				(globalSettings?.timeSlotDuration ||
																					10)) /
																				60) *
																				10
																		) / 10}
																		h
																	</div>
																)} */}
															</div>
															{allocation.hasConflict && (
																<div
																	className={cn(
																		'absolute flex items-center justify-center rounded-full bg-red-500',
																		isFullscreen
																			? '-right-1 -top-1 h-3 w-3'
																			: '-right-0.5 -top-0.5 h-2.5 w-2.5'
																	)}
																>
																	<AlertCircle
																		className={cn(
																			'text-white',
																			isFullscreen ? 'h-2 w-2' : 'h-1.5 w-1.5'
																		)}
																	/>
																</div>
															)}
														</div>
													)}
													{allocation && !isStart && shouldHide && (
														<div
															className={cn(
																'absolute bottom-0 top-0 border-l-2 border-blue-300 bg-blue-50 opacity-30',
																isFullscreen ? 'left-2 right-2' : 'left-1 right-1'
															)}
														/>
													)}
												</TableCell>
											);
										})}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>

				{/* Legend */}
				<div className={cn('mt-4 flex items-center justify-between', textSize)}>
					<div className='flex flex-wrap items-center gap-4'>
						<div className='flex items-center gap-1.5'>
							<div
								className={cn(
									'flex-shrink-0 rounded border border-blue-300 bg-blue-100',
									isFullscreen ? 'h-4 w-4' : 'h-3 w-3'
								)}
							></div>
							<span className='text-slate-600'>Booked</span>
						</div>
						<div className='flex items-center gap-1.5'>
							<div
								className={cn(
									'flex-shrink-0 rounded border border-red-300 bg-red-100',
									isFullscreen ? 'h-4 w-4' : 'h-3 w-3'
								)}
							></div>
							<span className='text-slate-600'>Conflict</span>
						</div>
						<div className='flex items-center gap-1.5'>
							<div
								className={cn(
									'flex-shrink-0 rounded border-2 border-slate-200 bg-white',
									isFullscreen ? 'h-4 w-4' : 'h-3 w-3'
								)}
							></div>
							<span className='text-slate-600'>Available</span>
						</div>
					</div>
					<div className='hidden text-slate-500 sm:block'>
						{isFullscreen ? (
							<>
								Press <kbd className='rounded bg-slate-100 px-2 py-1 text-xs'>Esc</kbd> to exit
								fullscreen
							</>
						) : (
							'Scroll to view more time slots'
						)}
					</div>
				</div>

				{totalAllocations === 0 && (
					<div className={cn('text-center text-slate-500', isFullscreen ? 'py-20' : 'py-12')}>
						<Calendar
							className={cn('mx-auto mb-2 opacity-50', isFullscreen ? 'mb-3 h-12 w-12' : 'h-8 w-8')}
						/>
						<p className={cn('font-medium', isFullscreen ? 'text-lg' : 'text-sm')}>No bookings scheduled</p>
						<p className={cn('mt-1', isFullscreen ? 'text-sm' : 'text-xs')}>
							Book a room to see it appear in the weekly schedule
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
