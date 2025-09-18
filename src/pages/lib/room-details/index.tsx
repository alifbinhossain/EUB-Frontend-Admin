// src/pages/lib/room-details/index.tsx
'use client';

import { lazy, useMemo, useRef, useState } from 'react';
import { AlertCircle, Book, Calendar, Clock, Maximize2, Minimize2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { IFormSelectOption } from '@/components/core/form/types';
import Pdf from '@/components/pdf/room-allocation';
import PdfV2 from '@/components/pdf/room-allocation-v2';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useOtherSemester, useOtherTeachers } from '@/lib/common-queries/other';
import { cn } from '@/lib/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { useRoomAllocationData } from '../config/query';
import { PDFSelector } from './_components/pdf-selector';
import { RoomSelector } from './_components/room-list';
import { Selector } from './_components/selector';
import { useFullscreen } from './hooks/use-fullscreen';
import { GlobalSettings, useGlobalSettings } from './hooks/use-global-settings';
import { useRoomAllocation } from './hooks/use-room-allocation';
import { formatTime } from './lib/time-utils';
import type { RoomAllocation, Weekday } from './lib/types';

const AddOrUpdate = lazy(() => import('./teachers-wise-room-allocation'));

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

const generateTimeSlots = (settings?: GlobalSettings): string[] => {
	const { timeSlotDuration = 10, startHour = 9, endHour = 23 } = settings ?? {};
	const slots: string[] = [];
	for (let hour = startHour; hour < endHour; hour++) {
		for (let minute = 0; minute < 60; minute += timeSlotDuration) {
			slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
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

export default function RoomDetails() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { isFullscreen, isSupported, toggleFullscreen } = useFullscreen();
	const { semester_id } = useParams();

	const [open, setOpen] = useState(false);

	const { rooms, selectedRoom, loading, selectRoom, allocations } = useRoomAllocation(semester_id as string);

	const { data } = useRoomAllocationData<RoomAllocation[]>(
		selectedRoom && semester_id ? `room_uuid=${selectedRoom.uuid}&semester_uuid=${semester_id}` : ''
	);
	const { data: teachersList } = useOtherTeachers<IFormSelectOption[]>(
		`semester_uuid=${semester_id}&is_room_allocation=true`
	);
	const { settings } = useGlobalSettings();

	// Check if both semester and room are selected
	const canShowSchedule = Boolean(semester_id && selectedRoom);

	const roomAllocations = canShowSchedule ? (allocations.length ? allocations : (data ?? [])) : [];

	const timeSlots = useMemo(() => generateTimeSlots(settings), [settings]);
	const weekdaysToShow = isFullscreen ? WEEKDAYS_FULL : WEEKDAYS;

	const displayTitle = useMemo(() => {
		const parts: string[] = [];
		if (selectedRoom?.name) parts.push(selectedRoom.name);

		return parts.length ? parts.join(' - ') : '';
	}, [selectedRoom?.name, semester_id]);

	const scheduleData = useMemo(() => {
		const sched: Record<Weekday, ScheduleBlock[]> = {
			sun: [],
			mon: [],
			tue: [],
			wed: [],
			thu: [],
			fri: [],
			sat: [],
		};

		if (!canShowSchedule) return sched;

		roomAllocations.forEach((alloc) => {
			const startIdx = timeSlots.indexOf(alloc.from);
			if (startIdx === -1) return;

			let duration: number;
			const endIdx = timeSlots.indexOf(alloc.to);
			if (endIdx !== -1) {
				duration = Math.max(1, endIdx - startIdx + 1);
			} else {
				const [sh, sm] = alloc.from.split(':').map(Number);
				const [eh, em] = alloc.to.split(':').map(Number);
				const diff = eh * 60 + em - (sh * 60 + sm);
				duration = Math.max(1, Math.ceil(diff / (settings?.timeSlotDuration ?? 10)));
			}

			sched[alloc.day].push({
				allocation: alloc,
				startSlot: startIdx,
				duration: Math.min(duration, timeSlots.length - startIdx),
			});
		});

		Object.values(sched).forEach((blocks) => {
			blocks.sort((a, b) => a.startSlot - b.startSlot);
			blocks.forEach((blk, i) => {
				blk.hasConflict = blocks.some((other, j) => {
					if (i === j) return false;
					const endA = blk.startSlot + blk.duration;
					const endB = other.startSlot + other.duration;
					return blk.startSlot < endB && endA > other.startSlot;
				});
			});
		});

		return sched;
	}, [canShowSchedule, roomAllocations, timeSlots, settings]);

	const getAllocationAtSlot = (day: Weekday, idx: number) =>
		scheduleData[day].find((b) => idx >= b.startSlot && idx < b.startSlot + b.duration) ?? null;

	const isStartOfAllocation = (day: Weekday, idx: number) => scheduleData[day].some((b) => b.startSlot === idx);

	const shouldHideSlot = (day: Weekday, idx: number) => {
		const a = getAllocationAtSlot(day, idx);
		return a !== null && !isStartOfAllocation(day, idx);
	};

	const totaldata = canShowSchedule ? roomAllocations.length : 0;
	const conflictCount = canShowSchedule
		? Object.values(scheduleData)
				.flat()
				.filter((b) => b.hasConflict).length
		: 0;

	const handleFullscreenToggle = async () => {
		if (containerRef.current) await toggleFullscreen(containerRef.current);
	};

	const cellHeight = isFullscreen ? 'h-12' : 'h-8';
	const blockHeightMultiplier = isFullscreen ? 48 : 32;
	const timeColWidth = isFullscreen ? 'w-28 min-w-[112px]' : 'w-20 min-w-[80px]';
	const dayColWidth = isFullscreen ? 'min-w-[160px]' : 'min-w-[100px]';
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
							{displayTitle && (
								<span
									className={cn('font-normal text-slate-600', isFullscreen ? 'text-xl' : 'text-base')}
								>
									– {displayTitle}
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
						{
							<div className='flex flex-col'>
								<label className='text-sm font-medium text-slate-700'>Select PDF</label>

								<div className='flex items-center gap-2'>
									<Button
										variant='outline'
										size='sm'
										onClick={() => setOpen(true)}
										className='h-9 px-3'
										title='PDF V2'
									>
										<Book className='mr-2 h-4 w-4' />
										Teacher Wise PDF
									</Button>
									<PDFSelector
										data={data || []}
										onPdf={(data) => Pdf(data)?.print()}
										onPdfV2={(data) => PdfV2(data)?.print()}
										onTeacherWisePdf={() => setOpen(true)}
										loading={loading}
									/>
								</div>
							</div>
						}
						{/* <div className='flex flex-col'>
							<label className='text-sm font-medium text-slate-700'>Select Semester</label>
							<Selector
								options={semesterOptions ?? []}
								selected={semesterId ?? null}
								onSelect={setSemesterId}
								loading={loading}
							/>
						</div> */}
						<div className='flex flex-col'>
							<label className='text-sm font-medium text-slate-700'>Select Room</label>
							<RoomSelector
								rooms={rooms}
								selectedRoom={selectedRoom}
								onRoomSelect={selectRoom}
								loading={loading}
							/>
						</div>

						{canShowSchedule && (
							<>
								<Badge
									variant='secondary'
									className={cn(
										'bg-slate-100 px-2 text-xs text-slate-700',
										isFullscreen ? 'h-7' : 'h-6'
									)}
								>
									{totaldata} Bookings
								</Badge>
								{conflictCount > 0 && (
									<Badge
										variant='destructive'
										className={cn('px-2 text-xs', isFullscreen ? 'h-7' : 'h-6')}
									>
										<AlertCircle className='mr-1 h-3 w-3' />
										{conflictCount} Conflicts
									</Badge>
								)}
							</>
						)}
						{isSupported && canShowSchedule && (
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

			{/* Conditional Content */}
			<div className={cn('pt-0', !isFullscreen && 'px-6 pb-6')}>
				{canShowSchedule ? (
					<>
						{/* Table - Only show when both semester and room are selected */}
						<div className='overflow-hidden rounded-lg border border-slate-200'>
							<div
								className={cn('overflow-auto', isFullscreen ? 'max-h-[calc(100vh-200px)]' : 'max-h-96')}
							>
								<Table>
									<TableHeader className='sticky top-0 z-10'>
										<TableRow className='border-b border-slate-200 bg-slate-50'>
											<TableHead
												className={cn(
													'sticky left-0 z-20 border-r border-slate-200 bg-slate-50 font-medium text-slate-700',
													timeColWidth,
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
														dayColWidth,
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
												<TableCell
													className={cn(
														'border-r border-slate-200 bg-inherit font-medium text-slate-600',
														timeColWidth,
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
												{weekdaysToShow.map((d) => {
													const a = getAllocationAtSlot(d.key, idx);
													const start = isStartOfAllocation(d.key, idx);
													const hide = shouldHideSlot(d.key, idx);
													return (
														<TableCell
															key={`${d.key}-${idx}`}
															className={cn(
																'relative bg-inherit',
																dayColWidth,
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
																				isFullscreen
																					? 'mb-1 text-xs'
																					: 'text-[10px]'
																			)}
																		>
																			{a.allocation.course_code} –{' '}
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
																					(settings?.timeSlotDuration ??
																						10)) /
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
																					isFullscreen
																						? 'h-2 w-2'
																						: 'h-1.5 w-1.5'
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
																		isFullscreen
																			? 'left-2 right-2'
																			: 'left-1 right-1'
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

						{totaldata === 0 && (
							<div className={cn('mt-8 text-center text-slate-500', isFullscreen ? 'py-20' : 'py-12')}>
								<Calendar
									className={cn(
										'mx-auto mb-2 opacity-50',
										isFullscreen ? 'mb-3 h-12 w-12' : 'h-8 w-8'
									)}
								/>
								<p className={cn('font-medium', isFullscreen ? 'text-lg' : 'text-sm')}>
									No bookings scheduled
								</p>
								<p className={cn('mt-1', isFullscreen ? 'text-sm' : 'text-xs')}>
									This room has no scheduled bookings for the selected semester
								</p>
							</div>
						)}
					</>
				) : (
					/* Selection Prompt */
					<div className={cn('text-center text-slate-500', isFullscreen ? 'py-32' : 'py-16')}>
						<div
							className={cn('mx-auto mb-4 flex flex-col items-center gap-4', isFullscreen ? 'mb-6' : '')}
						>
							<Calendar className={cn('opacity-40', isFullscreen ? 'h-16 w-16' : 'h-12 w-12')} />
							<div className='space-y-2'>
								<p className={cn('font-medium', isFullscreen ? 'text-xl' : 'text-lg')}>
									Select Semester and Room
								</p>
								<p className={cn('text-slate-400', isFullscreen ? 'text-base' : 'text-sm')}>
									Choose a semester and room from the dropdowns above to view the weekly schedule
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
			{renderSuspenseModals([
				<AddOrUpdate
					{...{
						open: open,
						setOpen: setOpen,
						teachersList: teachersList,
						semester_uuid: semester_id as string,
					}}
				/>,
			])}
		</div>
	);
}
