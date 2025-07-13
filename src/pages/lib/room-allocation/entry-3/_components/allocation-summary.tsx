'use client';

import { useCallback, useState } from 'react';
import { useRoomAllocationData } from '@/pages/lib/config/query';
import { PersonIcon } from '@radix-ui/react-icons';
import { Book, Calendar, Clock, Section, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { formatTime } from '../lib/time-utils';
import type { RoomAllocation } from '../lib/types';

interface AllocationSummaryProps {
	allocations: RoomAllocation[];
	selectedDay: string;
	invalidateRoomAllocation: () => void;
	invalidateTeachers: () => void;
	onDeleteAllocation?: (allocationId: string) => Promise<void>;
	deleteData: any;
}

export function AllocationSummary({
	allocations,
	selectedDay,
	onDeleteAllocation,
	invalidateRoomAllocation,
	invalidateTeachers,
	deleteData,
}: AllocationSummaryProps) {
	const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

	const dayAllocations = allocations?.filter((allocation) => allocation.day === selectedDay);

	const handleDelete = useCallback(
		async (allocationId: string) => {
			if (!onDeleteAllocation) return;
			await deleteData
				.mutateAsync({
					url: `/lib/room-allocation/${allocationId}`,
				})
				.then(() => {
					invalidateRoomAllocation();
					invalidateTeachers();
				});
		},
		[onDeleteAllocation]
	);

	if (dayAllocations?.length === 0) {
		return (
			<Card className='border-slate-200 shadow-sm'>
				<CardHeader className='pb-4'>
					<CardTitle className='flex items-center gap-2 text-lg text-slate-800'>
						<Calendar className='h-4 w-4' />
						Current Allocations
					</CardTitle>
					<CardDescription className='text-sm text-slate-600'>No allocations for this day</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	return (
		<Card className='border-slate-200 shadow-sm'>
			<CardHeader className='pb-4'>
				<CardTitle className='flex items-center gap-2 text-lg text-slate-800'>
					<Calendar className='h-4 w-4' />
					Current Allocations
				</CardTitle>
				<CardDescription className='text-sm text-slate-600'>
					{dayAllocations?.length} allocation{dayAllocations?.length !== 1 ? 's' : ''} scheduled
				</CardDescription>
			</CardHeader>
			<CardContent className='pt-0'>
				<div className='space-y-2'>
					{allocations?.map((allocation) => (
						<div
							key={allocation.uuid}
							className='flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-3 transition-colors hover:bg-slate-100'
						>
							<div className='flex flex-col gap-2.5'>
								<div className='flex items-center gap-2'>
									<Book className='h-3.5 w-3.5 text-slate-500' />
									<span className='text-sm font-medium text-slate-800'>
										{allocation.course_code} - {allocation.course_section}
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<PersonIcon className='h-3.5 w-3.5 text-slate-500' />
									<span className='text-sm font-medium text-slate-800'>
										{allocation.teacher_name}
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<Clock className='h-3.5 w-3.5 text-slate-500' />
									<span className='text-sm font-medium text-slate-800'>
										{formatTime(allocation.from)} - {formatTime(allocation.to)}
									</span>
								</div>
							</div>
							<div className='flex items-center gap-2'>
								<Badge
									variant='secondary'
									className='h-5 border-red-200 bg-red-100 px-2 text-xs text-red-700'
								>
									Occupied
								</Badge>
								{onDeleteAllocation && (
									<Button
										variant='ghost'
										size='sm'
										onClick={() => handleDelete(allocation.uuid)}
										disabled={deletingIds.has(allocation.uuid)}
										className='h-7 w-7 p-0 text-red-600 hover:bg-red-50 hover:text-red-700'
									>
										<Trash2 className='h-3 w-3' />
									</Button>
								)}
							</div>
						</div>
					))}
				</div>

				{onDeleteAllocation && (
					<div className='mt-3 rounded-md border border-amber-200 bg-amber-50 p-2.5'>
						<p className='text-xs text-amber-800'>
							<strong>Tip:</strong> Click the trash icon to remove an allocation.
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
