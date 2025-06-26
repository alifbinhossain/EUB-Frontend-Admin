'use client';

import { useState } from 'react';
import { AlertCircle, Clock, RotateCcw, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { GlobalSettings } from '../hooks/use-global-settings';

interface GlobalSettingsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	settings: GlobalSettings;
	onSettingsChange: (settings: Partial<GlobalSettings>) => void;
	onReset: () => void;
}

const TIME_SLOT_OPTIONS = [
	{ value: 5, label: '5 minutes', description: 'Very granular scheduling' },
	{ value: 10, label: '10 minutes', description: 'Standard granularity' },
	{ value: 15, label: '15 minutes', description: 'Quarter-hour intervals' },
	{ value: 20, label: '20 minutes', description: 'Moderate granularity' },
	{ value: 30, label: '30 minutes', description: 'Half-hour intervals' },
];

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => ({
	value: i,
	label: i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i - 12}:00 PM`,
}));

export function GlobalSettingsDialog({
	open,
	onOpenChange,
	settings,
	onSettingsChange,
	onReset,
}: GlobalSettingsDialogProps) {
	const [localSettings, setLocalSettings] = useState<GlobalSettings>(settings);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateSettings = (newSettings: GlobalSettings): Record<string, string> => {
		const newErrors: Record<string, string> = {};

		if (newSettings.timeSlotDuration < 1 || newSettings.timeSlotDuration > 60) {
			newErrors.timeSlotDuration = 'Duration must be between 1 and 60 minutes';
		}

		if (newSettings.startHour < 0 || newSettings.startHour > 23) {
			newErrors.startHour = 'Start hour must be between 0 and 23';
		}

		if (newSettings.endHour < 0 || newSettings.endHour > 23) {
			newErrors.endHour = 'End hour must be between 0 and 23';
		}

		if (newSettings.endHour <= newSettings.startHour) {
			newErrors.endHour = 'End hour must be after start hour';
		}

		return newErrors;
	};

	const handleSettingChange = (key: keyof GlobalSettings, value: number) => {
		const newSettings = { ...localSettings, [key]: value };
		setLocalSettings(newSettings);
		setErrors(validateSettings(newSettings));
	};

	const handleSave = () => {
		const validationErrors = validateSettings(localSettings);
		if (Object.keys(validationErrors).length === 0) {
			onSettingsChange(localSettings);
			onOpenChange(false);
		} else {
			setErrors(validationErrors);
		}
	};

	const handleReset = () => {
		onReset();
		onOpenChange(false);
	};

	const calculateTotalSlots = (settings: GlobalSettings): number => {
		const totalMinutes = (settings.endHour - settings.startHour) * 60;
		return Math.floor(totalMinutes / settings.timeSlotDuration);
	};

	const hasChanges = JSON.stringify(localSettings) !== JSON.stringify(settings);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-lg border-slate-200 shadow-lg'>
				<DialogHeader className='pb-4'>
					<DialogTitle className='flex items-center gap-2 text-slate-800'>
						<Settings className='h-5 w-5 text-blue-600' />
						Global Time Settings
					</DialogTitle>
					<DialogDescription className='text-sm text-slate-600'>
						Configure the global time slot duration and operating hours for the room allocation system.
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-6'>
					{/* Current Settings Overview */}
					<div className='rounded-md border border-blue-200 bg-blue-50 p-3'>
						<div className='mb-2 flex items-center gap-2 text-sm font-medium text-blue-800'>
							<Clock className='h-4 w-4' />
							<span>Current Configuration</span>
						</div>
						<div className='grid grid-cols-2 gap-4 text-xs text-blue-700'>
							<div>
								<span className='font-medium'>Time Slots:</span> {settings.timeSlotDuration} minutes
							</div>
							<div>
								<span className='font-medium'>Total Slots:</span> {calculateTotalSlots(settings)}
							</div>
							<div>
								<span className='font-medium'>Start Time:</span>{' '}
								{HOUR_OPTIONS.find((h) => h.value === settings.startHour)?.label}
							</div>
							<div>
								<span className='font-medium'>End Time:</span>{' '}
								{HOUR_OPTIONS.find((h) => h.value === settings.endHour)?.label}
							</div>
						</div>
					</div>

					{/* Time Slot Duration */}
					<div className='space-y-3'>
						<Label className='text-sm font-medium text-slate-700'>Time Slot Duration</Label>
						<Select
							value={localSettings.timeSlotDuration.toString()}
							onValueChange={(value) => handleSettingChange('timeSlotDuration', Number.parseInt(value))}
						>
							<SelectTrigger className='w-full'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{TIME_SLOT_OPTIONS.map((option) => (
									<SelectItem key={option.value} value={option.value.toString()}>
										<div className='flex flex-col'>
											<span className='font-medium'>{option.label}</span>
											<span className='text-xs text-muted-foreground'>{option.description}</span>
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.timeSlotDuration && (
							<div className='flex items-center gap-2 text-xs text-red-600'>
								<AlertCircle className='h-3 w-3' />
								<span>{errors.timeSlotDuration}</span>
							</div>
						)}
					</div>

					{/* Operating Hours */}
					<div className='space-y-3'>
						<Label className='text-sm font-medium text-slate-700'>Operating Hours</Label>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='startHour' className='text-xs text-slate-600'>
									Start Hour
								</Label>
								<Select
									value={localSettings.startHour.toString()}
									onValueChange={(value) => handleSettingChange('startHour', Number.parseInt(value))}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{HOUR_OPTIONS.slice(0, 22).map((option) => (
											<SelectItem key={option.value} value={option.value.toString()}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{errors.startHour && (
									<div className='flex items-center gap-2 text-xs text-red-600'>
										<AlertCircle className='h-3 w-3' />
										<span>{errors.startHour}</span>
									</div>
								)}
							</div>

							<div className='space-y-2'>
								<Label htmlFor='endHour' className='text-xs text-slate-600'>
									End Hour
								</Label>
								<Select
									value={localSettings.endHour.toString()}
									onValueChange={(value) => handleSettingChange('endHour', Number.parseInt(value))}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{HOUR_OPTIONS.slice(localSettings.startHour + 1).map((option) => (
											<SelectItem key={option.value} value={option.value.toString()}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{errors.endHour && (
									<div className='flex items-center gap-2 text-xs text-red-600'>
										<AlertCircle className='h-3 w-3' />
										<span>{errors.endHour}</span>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Preview */}
					{hasChanges && Object.keys(errors).length === 0 && (
						<div className='rounded-md border border-emerald-200 bg-emerald-50 p-3'>
							<div className='mb-2 text-sm font-medium text-emerald-800'>Preview Changes</div>
							<div className='grid grid-cols-2 gap-4 text-xs text-emerald-700'>
								<div>
									<span className='font-medium'>New Time Slots:</span>{' '}
									{localSettings.timeSlotDuration} minutes
								</div>
								<div>
									<span className='font-medium'>New Total Slots:</span>{' '}
									{calculateTotalSlots(localSettings)}
								</div>
								<div>
									<span className='font-medium'>New Start:</span>{' '}
									{HOUR_OPTIONS.find((h) => h.value === localSettings.startHour)?.label}
								</div>
								<div>
									<span className='font-medium'>New End:</span>{' '}
									{HOUR_OPTIONS.find((h) => h.value === localSettings.endHour)?.label}
								</div>
							</div>
						</div>
					)}

					{/* Warning */}
					<div className='rounded-md border border-amber-200 bg-amber-50 p-3'>
						<div className='text-xs text-amber-800'>
							<strong>Note:</strong> Changing these settings will affect all time slot generation
							throughout the application. Existing bookings may need to be reviewed for compatibility.
						</div>
					</div>
				</div>

				<DialogFooter className='gap-2 pt-4'>
					<Button variant='outline' onClick={handleReset} className='h-9'>
						<RotateCcw className='mr-2 h-3 w-3' />
						Reset to Defaults
					</Button>
					<Button variant='outline' onClick={() => onOpenChange(false)} className='h-9'>
						Cancel
					</Button>
					<Button onClick={handleSave} disabled={Object.keys(errors).length > 0} className='h-9'>
						Save Settings
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
