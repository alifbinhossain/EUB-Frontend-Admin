'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { WEEKDAYS, type Weekday } from '../lib/types';

interface WeekdaySelectorProps {
	selectedDay: Weekday | null;
	onDaySelect: (day: Weekday) => void;
	disabled?: boolean;
}

export function WeekdaySelector({ selectedDay, onDaySelect, disabled }: WeekdaySelectorProps) {
	return (
		<Select value={selectedDay || ''} onValueChange={(value) => onDaySelect(value as Weekday)} disabled={disabled}>
			<SelectTrigger className='w-full'>
				<SelectValue placeholder='Select a weekday' />
			</SelectTrigger>
			<SelectContent>
				{WEEKDAYS.map((day) => (
					<SelectItem key={day.value} value={day.value}>
						{day.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
