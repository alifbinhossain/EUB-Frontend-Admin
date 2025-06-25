import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { Room } from '../_config/types';

interface RoomSelectorProps {
	rooms: Room[];
	selectedRoom: string;
	onRoomSelect: (roomId: string) => void;
}

export const RoomSelector = React.memo<RoomSelectorProps>(({ rooms, selectedRoom, onRoomSelect }) => {
	return (
		<Card className='border'>
			<CardHeader>
				<CardTitle className='text-lg font-medium text-gray-900'>Select Room</CardTitle>
			</CardHeader>
			<CardContent>
				<Select value={selectedRoom} onValueChange={onRoomSelect}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Choose a room to view available slots...' />
					</SelectTrigger>
					<SelectContent>
						{rooms.map((room) => (
							<SelectItem key={room.id} value={room.id}>
								{room.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</CardContent>
		</Card>
	);
});

RoomSelector.displayName = 'RoomSelector';
