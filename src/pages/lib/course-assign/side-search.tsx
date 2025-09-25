import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { matchSorter } from 'match-sorter';
import { useDebounce } from 'use-debounce';

import { IFormSelectOption } from '@/components/core/form/types';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

import { useOtherCourse } from '@/lib/common-queries/other';
import { cn } from '@/lib/utils';

export function SideSearch({ form }: { form?: any }) {
	const [value, setValue] = useState('');
	const [searchText, setSearchText] = useState('');
	const [debouncedValue] = useDebounce(searchText, 600);
	const { data: courseData } = useOtherCourse<IFormSelectOption[]>();

	const filteredCourses = useMemo(() => {
		if (!debouncedValue || !courseData) return courseData || [];

		const normalizedSearch = debouncedValue.replace(/[-\s]/g, '').toLowerCase();

		return matchSorter(courseData, normalizedSearch, {
			keys: [
				(course) => String(course.label).replace(/[-\s]/g, '').toLowerCase(),
				(course) => String(course.label).replace(/-/g, ' ').toLowerCase(),
				(course) => String(course.label).toLowerCase(),
			],
			threshold: matchSorter.rankings.ACRONYM,
		});
	}, [courseData, debouncedValue]);

	return (
		<Command className='flex h-full max-h-[75vh] flex-col' shouldFilter={false}>
			<div className='flex-shrink-0 rounded-md border'>
				<CommandInput
					placeholder='Search Course...'
					value={searchText}
					onValueChange={setSearchText}
					className='h-9'
				/>
			</div>
			<CommandList className='max-h-none flex-1 overflow-auto'>
				<CommandEmpty>No course found</CommandEmpty>
				<CommandGroup>
					{filteredCourses?.map((course) => (
						<CommandItem
							className='mt-2 rounded-md border'
							key={course.value}
							value={String(course.label).toLowerCase()}
							onSelect={(currentValue) => {
								const selected = filteredCourses.find(
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
