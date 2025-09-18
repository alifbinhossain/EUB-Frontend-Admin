'use client';

import { useState } from 'react';
import { Building2, Check, ChevronDown, ChevronUp } from 'lucide-react';

import { IFormSelectOption } from '@/components/core/form/types';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

interface SelectorProps {
	options: IFormSelectOption[];
	selected: IFormSelectOption | null;
	onSelect: (room: IFormSelectOption) => void;
	loading?: boolean;
}

export function Selector({ options, selected, onSelect, loading }: SelectorProps) {
	const [open, setOpen] = useState(false);

	if (loading) {
		return (
			<Button disabled variant='outline' className='w-full justify-between'>
				Loading options...
				<ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
			</Button>
		);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
					{selected ? (
						<div className='flex min-w-0 flex-1 items-center gap-2'>
							<Building2 className='h-4 w-4 shrink-0' />
							<span className='truncate'>{selected.label}</span>
						</div>
					) : (
						'Select an option...'
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
					<CommandInput placeholder='Search options...' className='h-9 w-full' />
					<CommandList>
						<CommandEmpty>No options found.</CommandEmpty>
						<CommandGroup>
							{options?.map((room) => (
								<CommandItem
									key={room.value}
									value={`${room.label}`}
									onSelect={() => {
										onSelect(room);
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
														selected?.value === room.value ? 'opacity-100' : 'opacity-0'
													)}
												/>
												<span className='truncate font-medium'>{room.label}</span>
											</div>
											<div className='ml-6 mt-1 flex items-center gap-4 text-xs text-muted-foreground'></div>
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
