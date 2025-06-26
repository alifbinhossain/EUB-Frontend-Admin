'use client';

import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { SelectedSlot } from '../_config/types';

interface SelectedSlotsSummaryProps {
	selectedSlots: SelectedSlot[];
	onAssign: () => void;
}

export const SelectedSlotsSummary = React.memo<SelectedSlotsSummaryProps>(({ selectedSlots, onAssign }) => {
	if (selectedSlots.length === 0) {
		return null;
	}

	return (
		<Card className='border border-gray-200'>
			<CardHeader>
				<CardTitle className='text-lg font-medium text-gray-900'>
					Selected Slots ({selectedSlots.length})
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='flex flex-wrap gap-2'>
					{selectedSlots.map((slot, index) => (
						<Badge key={index} variant='outline' className='text-sm'>
							{slot.day} {slot.timeLabel}
						</Badge>
					))}
				</div>

				<Button onClick={onAssign} className='w-full'>
					Assign Selected Slots
				</Button>
			</CardContent>
		</Card>
	);
});

SelectedSlotsSummary.displayName = 'SelectedSlotsSummary';
