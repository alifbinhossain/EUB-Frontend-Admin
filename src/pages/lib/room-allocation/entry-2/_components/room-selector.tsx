'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { Room } from '../_config/types';

interface RoomSelectorProps {
	rooms: Room[];
	selectedRoom: string | null;
	onRoomSelect: (roomId: string) => void;
}

export function RoomSelector({ rooms, selectedRoom, onRoomSelect }: RoomSelectorProps) {
	return (
		<div className='space-y-2'>
			<Label htmlFor='room-select' className='text-sm font-medium'>
				Select Room
			</Label>
			<Select value={selectedRoom || ''} onValueChange={onRoomSelect}>
				<SelectTrigger id='room-select' className='w-full'>
					<SelectValue placeholder='Choose a room...' />
				</SelectTrigger>
				<SelectContent>
					{rooms.map((room) => (
						<SelectItem key={room.id} value={room.id}>
							<div className='flex flex-col'>
								<span className='font-medium'>{room.name}</span>
								<span className='text-xs text-muted-foreground'>
									{room.type} • Capacity: {room.capacity}
								</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
