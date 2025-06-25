'use client';

import { useEffect, useState } from 'react';

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
import { Textarea } from '@/components/ui/textarea';

import type { BookingInfo, TimeSlot } from '../_config/types';

interface BookingDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	slot: TimeSlot | null;
	mode: 'add' | 'edit';
	onSave: (bookingInfo: BookingInfo) => void;
}

export function BookingDialog({ open, onOpenChange, slot, mode, onSave }: BookingDialogProps) {
	const [formData, setFormData] = useState({
		title: '',
		assignedTo: '',
		description: '',
	});

	useEffect(() => {
		if (slot && mode === 'edit' && slot.booking) {
			setFormData({
				title: slot.booking.title,
				assignedTo: slot.booking.assignedTo,
				description: slot.booking.description || '',
			});
		} else {
			setFormData({
				title: '',
				assignedTo: '',
				description: '',
			});
		}
	}, [slot, mode]);

	const handleSave = () => {
		if (!slot || !formData.title.trim() || !formData.assignedTo.trim()) return;

		const bookingInfo: BookingInfo = {
			id: slot.booking?.id || `booking-${Date.now()}`,
			title: formData.title.trim(),
			assignedTo: formData.assignedTo.trim(),
			startTime: slot.startTime,
			endTime: slot.endTime,
			day: slot.day,
			description: formData.description.trim(),
		};

		onSave(bookingInfo);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{mode === 'add' ? 'Add Booking' : 'Edit Booking'}</DialogTitle>
					<DialogDescription>
						{slot && (
							<>
								{slot.day} • {slot.startTime} - {slot.endTime}
							</>
						)}
					</DialogDescription>
				</DialogHeader>

				<div className='grid gap-4 py-4'>
					<div className='grid gap-2'>
						<Label htmlFor='title'>Title *</Label>
						<Input
							id='title'
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							placeholder='e.g., Team Meeting, Lecture, etc.'
						/>
					</div>

					<div className='grid gap-2'>
						<Label htmlFor='assignedTo'>Assigned To *</Label>
						<Input
							id='assignedTo'
							value={formData.assignedTo}
							onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
							placeholder='e.g., SEC-1, John Doe, etc.'
						/>
					</div>

					<div className='grid gap-2'>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							id='description'
							value={formData.description}
							onChange={(e) => setFormData({ ...formData, description: e.target.value })}
							placeholder='Additional details about the booking...'
							rows={3}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleSave} disabled={!formData.title.trim() || !formData.assignedTo.trim()}>
						{mode === 'add' ? 'Add Booking' : 'Save Changes'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
