'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import type { SelectedSlot, Slot, TimeSlot } from '../_config/types';
import { SlotCell } from './slot-cell';

interface ScheduleTableProps {
	timeSlots: TimeSlot[];
	daysOfWeek: readonly string[];
	slots: Slot[];
	selectedSlots: SelectedSlot[];
	loading: boolean;
	onSlotClick: (day: string, timeSlotId: string) => void;
	onEditSlot: (day: string, timeSlotId: string) => void;
	onDeleteSlot: (day: string, timeSlotId: string) => void;
	getSlotForDayAndTime: (day: string, timeSlotId: string) => Slot | undefined;
	isSlotSelected: (day: string, timeSlotId: string) => boolean;
}

const LoadingState = React.memo(() => (
	<Card className='border border-gray-200'>
		<CardContent className='flex items-center justify-center py-12'>
			<div className='text-center'>
				<Loader2 className='mx-auto mb-4 h-8 w-8 animate-spin text-gray-400' />
				<p className='text-gray-600'>Loading available slots...</p>
			</div>
		</CardContent>
	</Card>
));

LoadingState.displayName = 'LoadingState';

export const ScheduleTable = React.memo<ScheduleTableProps>(
	({
		timeSlots,
		daysOfWeek,
		loading,
		onSlotClick,
		onEditSlot,
		onDeleteSlot,
		getSlotForDayAndTime,
		isSlotSelected,
	}) => {
		if (loading) {
			return <LoadingState />;
		}

		return (
			<Card className='border'>
				<CardHeader className='py-4'>
					<CardTitle className='text-lg font-medium'>Weekly Schedule</CardTitle>
				</CardHeader>
				<CardContent className='p-0'>
					<div className='overflow-x-auto border-t'>
						<Table>
							<TableHeader>
								<TableRow className='bg-base'>
									<TableHead className='w-20 border-r font-medium'>Day</TableHead>
									{timeSlots.map((timeSlot) => (
										<TableHead
											key={timeSlot.id}
											className='min-w-[120px] border-r border-gray-200 text-center font-medium text-gray-700 last:border-r-0'
										>
											<div className='py-2'>
												<div className='text-sm'>{timeSlot.label}</div>
												<div className='mt-1 text-xs text-gray-500'>
													{timeSlot.start} - {timeSlot.end}
												</div>
											</div>
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{daysOfWeek.map((day) => (
									<TableRow key={day} className='border-b bg-white'>
										<TableCell className='border-r text-center font-medium text-gray-700'>
											<div className='py-2 text-sm'>{day}</div>
										</TableCell>
										{timeSlots.map((timeSlot) => (
											<SlotCell
												key={`${day}-${timeSlot.id}`}
												slot={getSlotForDayAndTime(day, timeSlot.id)}
												day={day}
												timeSlotId={timeSlot.id}
												isSelected={isSlotSelected(day, timeSlot.id)}
												onSlotClick={onSlotClick}
												onEditSlot={onEditSlot}
												onDeleteSlot={onDeleteSlot}
											/>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		);
	}
);

ScheduleTable.displayName = 'ScheduleTable';
