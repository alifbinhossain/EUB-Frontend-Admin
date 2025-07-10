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

// Generate time slots including the final HH:00 row
const generateTimeSlots = (settings?: GlobalSettings): string[] => {
	const { timeSlotDuration = 10, startHour = 9, endHour = 23 } = settings ?? {};
	const slots: string[] = [];
	for (let hour = startHour; hour < endHour; hour++) {
		for (let minute = 0; minute < 60; minute += timeSlotDuration) {
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

	// Memoize time slots
	const timeSlots = useMemo(() => generateTimeSlots(globalSettings), [globalSettings]);

	// Choose header labels based on fullscreen
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

		allocations.forEach((allocation) => {
			const startIndex = timeSlots.findIndex((s) => s === allocation.from);
			if (startIndex === -1) return;

			// Determine duration in slots
			let duration: number;
			const endIndex = timeSlots.findIndex((s) => s === allocation.to);
			if (endIndex !== -1) {
				duration = Math.max(1, endIndex - startIndex + 1);
			} else {
				const [sh, sm] = allocation.from.split(':').map(Number);
				const [eh, em] = allocation.to.split(':').map(Number);
				const diff = eh * 60 + em - (sh * 60 + sm);
				const slotDur = globalSettings?.timeSlotDuration || 10;
				duration = Math.max(1, Math.ceil(diff / slotDur));
			}

			schedule[allocation.day].push({
				allocation,
				startSlot: startIndex,
				duration: Math.min(duration, timeSlots.length - startIndex),
			});
		});

		// Sort and detect conflicts
		Object.values(schedule).forEach((daySchedule) => {
			daySchedule.sort((a, b) => a.startSlot - b.startSlot);
			daySchedule.forEach((block, i) => {
				block.hasConflict = daySchedule.some((other, j) => {
					if (i === j) return false;
					const endA = block.startSlot + block.duration;
					const endB = other.startSlot + other.duration;
					return block.startSlot < endB && endA > other.startSlot;
				});
			});
		});

		return schedule;
	}, [allocations, timeSlots, globalSettings]);

	// Helpers for rendering
	const getAllocationAtSlot = (day: Weekday, idx: number) =>
		scheduleData[day].find((b) => idx >= b.startSlot && idx < b.startSlot + b.duration) || null;

	const isStartOfAllocation = (day: Weekday, idx: number) => scheduleData[day].some((b) => b.startSlot === idx);

	const shouldHideSlot = (day: Weekday, idx: number) => {
		const a = getAllocationAtSlot(day, idx);
		return a !== null && !isStartOfAllocation(day, idx);
	};

	const totalAllocations = allocations.length;
	const conflictCount = Object.values(scheduleData)
		.flat()
		.filter((b) => b.hasConflict).length;

	const handleFullscreenToggle = async () => {
		if (containerRef.current) await toggleFullscreen(containerRef.current);
	};

	// Styling constants
	const cellHeight = isFullscreen ? 'h-12' : 'h-8';
	const blockHeightMultiplier = isFullscreen ? 48 : 32;
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
									– {roomName}
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

			{/* Table */}
			<div className={cn('pt-0', !isFullscreen && 'px-6 pb-6')}>
				<div className='overflow-hidden rounded-lg border border-slate-200'>
					<div className={cn('overflow-auto', isFullscreen ? 'max-h-[calc(100vh-200px)]' : 'max-h-96')}>
						<Table>
							<TableHeader className='sticky top-0 z-10'>
								<TableRow className='border-b border-slate-200 bg-slate-50'>
									<TableHead
										className={cn(
											'sticky left-0 z-20 border-r border-slate-200 bg-slate-50 font-medium text-slate-700',
											timeColumnWidth,
											headerTextSize
										)}
									>
										Time
									</TableHead>
									{weekdaysToShow.map((d) => (
										<TableHead
											key={d.key}
											className={cn(
												'bg-slate-50 text-center font-medium text-slate-700',
												dayColumnWidth,
												headerTextSize
											)}
										>
											{d.label}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{timeSlots.map((slot, idx) => (
									<TableRow
										key={slot}
										className={cn(
											'hover:bg-slate-25 border-b border-slate-100',
											cellHeight,
											idx % 2 === 0 ? 'bg-white' : 'bg-slate-25'
										)}
									>
										{/* Time */}
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
												<span className='truncate'>{formatTime(slot)}</span>
											</div>
										</TableCell>

										{/* Day Columns */}
										{weekdaysToShow.map((d) => {
											const a = getAllocationAtSlot(d.key, idx);
											const start = isStartOfAllocation(d.key, idx);
											const hide = shouldHideSlot(d.key, idx);

											return (
												<TableCell
													key={`${d.key}-${idx}`}
													className={cn(
														'relative bg-inherit',
														dayColumnWidth,
														isFullscreen ? 'p-2' : 'p-1'
													)}
												>
													{a && start && (
														<div
															className={cn(
																'absolute flex items-center justify-center overflow-hidden rounded-sm border px-1 font-medium shadow-sm transition-all',
																a.hasConflict
																	? 'border-red-300 bg-red-100 text-red-800'
																	: 'border-blue-300 bg-blue-100 text-blue-800',
																isFullscreen
																	? 'left-2 right-2 px-2 text-sm'
																	: 'left-1 right-1 text-xs',
																textSize
															)}
															style={{
																top: isFullscreen ? '4px' : '2px',
																height: `${a.duration * blockHeightMultiplier}px`,
																zIndex: 5,
															}}
														>
															<div className='w-full text-center leading-tight'>
																<div
																	className={cn(
																		'font-semibold uppercase tracking-wide',
																		isFullscreen ? 'mb-1 text-xs' : 'text-[10px]'
																	)}
																>
																	{a.allocation.course_code} -{' '}
																	{a.allocation.course_section}
																</div>
																<div
																	className={cn(
																		'opacity-80',
																		isFullscreen
																			? 'mb-1 text-xs'
																			: 'mt-0.5 text-[9px]'
																	)}
																>
																	{a.allocation.teacher_name}
																</div>
																<div
																	className={cn(
																		'whitespace-nowrap opacity-70',
																		isFullscreen ? 'text-xs' : 'text-[9px]'
																	)}
																>
																	{formatTime(a.allocation.from)} –{' '}
																	{formatTime(a.allocation.to)}
																</div>
																<div
																	className={cn(
																		'opacity-80',
																		isFullscreen
																			? 'mb-1 text-xs'
																			: 'mt-0.5 text-[9px]'
																	)}
																>
																	Duration:{' '}
																	{Math.round(
																		((a.duration *
																			(globalSettings?.timeSlotDuration || 10)) /
																			60) *
																			10
																	) / 10}
																	h
																</div>
															</div>
															{a.hasConflict && (
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
													{a && !start && hide && (
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

				{/* Legend & Empty State */}
				<div className={cn('mt-4 flex items-center justify-between', textSize)}>
					<div className='flex flex-wrap items-center gap-4'>
						<div className='flex items-center gap-1.5'>
							<div
								className={cn(
									'flex-shrink-0 rounded border border-blue-300 bg-blue-100',
									isFullscreen ? 'h-4 w-4' : 'h-3 w-3'
								)}
							/>
							<span className='text-slate-600'>Booked</span>
						</div>
						<div className='flex items-center gap-1.5'>
							<div
								className={cn(
									'flex-shrink-0 rounded border border-red-300 bg-red-100',
									isFullscreen ? 'h-4 w-4' : 'h-3 w-3'
								)}
							/>
							<span className='text-slate-600'>Conflict</span>
						</div>
						<div className='flex items-center gap-1.5'>
							<div
								className={cn(
									'flex-shrink-0 rounded border-2 border-slate-200 bg-white',
									isFullscreen ? 'h-4 w-4' : 'h-3 w-3'
								)}
							/>
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
