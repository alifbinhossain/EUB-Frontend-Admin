'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { IFormSelectOption } from '@/components/core/form/types';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

import { useOtherCourse } from '@/lib/common-queries/other';
import { cn } from '@/lib/utils';

export function SideSearch({ form }: { form?: any }) {
	const [value, setValue] = React.useState('');
	const { data: courseData } = useOtherCourse<IFormSelectOption[]>();

	return (
		<Command className=''>
			<div className='rounded-md border'>
				<CommandInput placeholder='Search course...' className='h-9' />
			</div>
			<CommandList className='max-h-60'>
				<CommandEmpty>No course found.</CommandEmpty>
				<CommandGroup className=''>
					{courseData?.map((course) => (
						<CommandItem
							className='mt-2 rounded-md border'
							key={course.value}
							value={String(course.label).toLowerCase()} // use label for searchable value
							onSelect={(currentValue) => {
								const selected = courseData.find(
									(c) => String(c.label).toLowerCase() === String(currentValue).toLowerCase()
								);
								setValue(selected?.value !== undefined ? String(selected.value) : '');
								form?.setValue('course_uuid', selected?.value ?? '');
							}}
						>
							{course.label}
							<Check className={cn('ml-auto', value === course.value ? 'opacity-100' : 'opacity-0')} />
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
