'use client';

import { useState } from 'react';
import { AlertCircle, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { formatTime } from '../lib/time-utils';

interface DurationInputDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	startTime: string;
	onConfirm: (duration: number) => void;
	defaultDuration?: number;
}

export function DurationInputDialog({
	open,
	onOpenChange,
	startTime,
	onConfirm,
	defaultDuration = 10,
}: DurationInputDialogProps) {
	const [duration, setDuration] = useState<string>(defaultDuration.toString());
	const [error, setError] = useState<string | null>(null);

	const calculateEndTime = (start: string, durationMinutes: number): string => {
		const [hours, minutes] = start.split(':').map(Number);
		const totalMinutes = hours * 60 + minutes + durationMinutes;
		const endHours = Math.floor(totalMinutes / 60);
		const endMins = totalMinutes % 60;

		// Handle overflow past midnight
		if (endHours >= 24) {
			return `${(endHours - 24).toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')} (+1 day)`;
		}

		return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
	};

	const validateDuration = (value: string): boolean => {
		const num = Number.parseInt(value);
		if (isNaN(num) || num <= 0) {
			setError('Duration must be a positive number');
			return false;
		}
		if (num > 480) {
			// Max 8 hours
			setError('Duration cannot exceed 8 hours (480 minutes)');
			return false;
		}
		setError(null);
		return true;
	};

	const handleDurationChange = (value: string) => {
		setDuration(value);
		validateDuration(value);
	};

	const handleConfirm = () => {
		if (validateDuration(duration)) {
			onConfirm(Number.parseInt(duration));
			onOpenChange(false);
		}
	};

	const handleUseDefault = () => {
		onConfirm(defaultDuration);
		onOpenChange(false);
	};

	const presetDurations = [10, 30, 60, 90, 120, 180];

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-md border-slate-200 shadow-lg'>
				<DialogHeader className='pb-4'>
					<DialogTitle className='flex items-center gap-2 text-slate-800'>
						<Clock className='h-5 w-5 text-blue-600' />
						Set Duration
					</DialogTitle>
					<DialogDescription className='text-sm text-slate-600'>
						This is the last available slot. Please specify how long you need the room.
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-4'>
					{/* Current Selection Info */}
					<div className='rounded-md border border-blue-200 bg-blue-50 p-3'>
						<div className='flex items-center gap-2 text-sm font-medium text-blue-800'>
							<Clock className='h-4 w-4' />
							<span>Start Time: {formatTime(startTime)}</span>
						</div>
						{duration && !error && (
							<div className='mt-1 text-xs text-blue-700'>
								End Time: {calculateEndTime(startTime, Number.parseInt(duration) || 0)}
							</div>
						)}
					</div>

					{/* Duration Input */}
					<div className='space-y-2'>
						<Label htmlFor='duration' className='text-sm font-medium text-slate-700'>
							Duration (minutes)
						</Label>
						<Input
							id='duration'
							type='number'
							value={duration}
							onChange={(e) => handleDurationChange(e.target.value)}
							placeholder='Enter duration in minutes'
							min='1'
							max='480'
							className='h-10'
						/>
						{error && (
							<div className='flex items-center gap-2 text-xs text-red-600'>
								<AlertCircle className='h-3 w-3' />
								<span>{error}</span>
							</div>
						)}
					</div>

					{/* Preset Durations */}
					<div className='space-y-2'>
						<Label className='text-sm font-medium text-slate-700'>Quick Select</Label>
						<div className='flex flex-wrap gap-2'>
							{presetDurations.map((preset) => (
								<Button
									key={preset}
									variant='outline'
									size='sm'
									onClick={() => handleDurationChange(preset.toString())}
									className={`h-8 px-3 text-xs ${
										duration === preset.toString()
											? 'border-blue-300 bg-blue-50 text-blue-700'
											: 'hover:bg-slate-50'
									}`}
								>
									{preset}m
									{preset >= 60 && (
										<span className='ml-1 text-slate-500'>
											({Math.floor(preset / 60)}h{preset % 60 > 0 ? ` ${preset % 60}m` : ''})
										</span>
									)}
								</Button>
							))}
						</div>
					</div>

					{/* Duration Summary */}
					{duration && !error && (
						<div className='rounded-md border border-emerald-200 bg-emerald-50 p-3'>
							<div className='text-sm font-medium text-emerald-800'>
								Selected Duration: {duration} minutes
								{Number.parseInt(duration) >= 60 && (
									<span className='ml-2 text-emerald-700'>
										({Math.floor(Number.parseInt(duration) / 60)}h
										{Number.parseInt(duration) % 60 > 0
											? ` ${Number.parseInt(duration) % 60}m`
											: ''}
										)
									</span>
								)}
							</div>
						</div>
					)}

					{/* Default Option Info */}
					<div className='rounded-md border border-slate-200 bg-slate-50 p-3'>
						<div className='text-xs text-slate-600'>
							<strong>Default Duration:</strong> {defaultDuration} minutes
							<br />
							You can use the default or set a custom duration above.
						</div>
					</div>
				</div>

				<DialogFooter className='gap-2 pt-4'>
					<Button variant='outline' onClick={() => onOpenChange(false)} className='h-9'>
						Cancel
					</Button>
					<Button variant='outline' onClick={handleUseDefault} className='h-9'>
						Use Default ({defaultDuration}m)
					</Button>
					<Button onClick={handleConfirm} disabled={!!error || !duration} className='h-9'>
						Confirm Duration
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
