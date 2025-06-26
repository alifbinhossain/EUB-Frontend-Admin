'use client';

import { Building2, MapPin, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { Room } from '../lib/types';

interface RoomSelectorProps {
	rooms: Room[];
	selectedRoom: Room | null;
	onRoomSelect: (room: Room) => void;
	loading?: boolean;
}

export function RoomSelector({ rooms, selectedRoom, onRoomSelect, loading }: RoomSelectorProps) {
	if (loading) {
		return (
			<Select disabled>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Loading rooms...' />
				</SelectTrigger>
			</Select>
		);
	}

	return (
		<Select
			value={selectedRoom?.uuid || ''}
			onValueChange={(value) => {
				const room = rooms.find((r) => r.uuid === value);
				if (room) onRoomSelect(room);
			}}
		>
			<SelectTrigger className='w-full'>
				<SelectValue placeholder='Select a room'>
					{selectedRoom && (
						<div className='flex items-center gap-2'>
							<Building2 className='h-4 w-4' />
							<span>{selectedRoom.name}</span>
							<Badge variant={selectedRoom.type === 'lab' ? 'default' : 'secondary'} className='ml-auto'>
								{selectedRoom.type}
							</Badge>
						</div>
					)}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{rooms.map((room) => (
					<SelectItem key={room.uuid} value={room.uuid}>
						<div className='flex w-full items-center justify-between'>
							<div className='flex flex-col'>
								<div className='flex items-center gap-2'>
									<span className='font-medium'>{room.name}</span>
									<Badge variant={room.type === 'lab' ? 'default' : 'secondary'}>{room.type}</Badge>
								</div>
								<div className='mt-1 flex items-center gap-4 text-xs text-muted-foreground'>
									{room.location && (
										<div className='flex items-center gap-1'>
											<MapPin className='h-3 w-3' />
											{room.location}
										</div>
									)}
									<div className='flex items-center gap-1'>
										<Users className='h-3 w-3' />
										{room.capacity}
									</div>
								</div>
							</div>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
