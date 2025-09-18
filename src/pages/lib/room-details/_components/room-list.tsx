'use client';

import { useState } from 'react';
import { Building2, Check, ChevronDown, ChevronUp, MapPin, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import type { Room } from '../lib/types';

interface RoomSelectorProps {
	rooms: Room[];
	selectedRoom: Room | null;
	onRoomSelect: (room: Room) => void;
	loading?: boolean;
}

export function RoomSelector({ rooms, selectedRoom, onRoomSelect, loading }: RoomSelectorProps) {
	const [open, setOpen] = useState(false);

	if (loading) {
		return (
			<Button disabled variant='outline' className='w-full justify-between'>
				Loading rooms...
				<ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
			</Button>
		);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
					{selectedRoom ? (
						<div className='flex min-w-0 flex-1 items-center gap-2'>
							<Building2 className='h-4 w-4 shrink-0' />
							<span className='truncate'>{selectedRoom.name}</span>
							<Badge variant={selectedRoom.type === 'lab' ? 'default' : 'secondary'} className='shrink-0'>
								{selectedRoom.type}
							</Badge>
						</div>
					) : (
						'Select a room...'
					)}
					{open ? (
						<ChevronUp className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					) : (
						<ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[--radix-popover-trigger-width] p-0' align='start'>
				<Command className='w-full'>
					<CommandInput placeholder='Search rooms...' className='h-9 w-full' />
					<CommandList>
						<CommandEmpty>No rooms found.</CommandEmpty>
						<CommandGroup>
							{rooms.map((room) => (
								<CommandItem
									key={room.uuid}
									value={`${room.name} ${room.type} ${room.location || ''}`}
									onSelect={() => {
										onRoomSelect(room);
										setOpen(false);
									}}
									className='cursor-pointer'
								>
									<div className='flex w-full items-center justify-between'>
										<div className='flex min-w-0 flex-1 flex-col'>
											<div className='flex items-center gap-2'>
												<Check
													className={cn(
														'h-4 w-4',
														selectedRoom?.uuid === room.uuid ? 'opacity-100' : 'opacity-0'
													)}
												/>
												<span className='truncate font-medium'>{room.name}</span>
												<Badge
													variant={room.type === 'lab' ? 'default' : 'secondary'}
													className='shrink-0'
												>
													{room.type}
												</Badge>
											</div>
											<div className='ml-6 mt-1 flex items-center gap-4 text-xs text-muted-foreground'>
												{room.location && (
													<div className='flex items-center gap-1'>
														<MapPin className='h-3 w-3' />
														<span className='truncate'>{room.location}</span>
													</div>
												)}
												<div className='flex shrink-0 items-center gap-1'>
													<Users className='h-3 w-3' />
													{room.capacity}
												</div>
											</div>
										</div>
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
