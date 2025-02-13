import { ColumnDef } from '@tanstack/react-table';

import { cn } from '@/lib/utils';

import { IVisitorTableData } from './columns.type';

// * Inquiry
export const visitorColumns = (): ColumnDef<IVisitorTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: true,
		cell: (info) => (
			<span
				className={cn(`rounded-full px-3 py-2 capitalize`, {
					'bg-yellow-400': info?.getValue() === 'pending',
					'bg-red-400': info?.getValue() === 'rejected',
					'bg-green-400': info?.getValue() === 'converted',
				})}
			>
				{info?.getValue() as string}
			</span>
		),
	},
	{
		accessorKey: 'mobile',
		header: 'Mobile',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
		cell: (info) =>
			(info?.getValue() as string)
				.split('_') // Split by underscores
				.map(
					(word: string, index: number) =>
						index === 0
							? word.charAt(0).toUpperCase() + word.slice(1) // Capitalize first word
							: word // Keep other words as is
				)
				.join(' '), // Join with space
	},

	// Call entry
	{
		accessorKey: 'subject_preference',
		header: 'Subject',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'from_where',
		header: 'From Where',
		enableColumnFilter: true,
	},

	// FAQ
	{
		accessorKey: 'prev_institution',
		header: 'Prev Institution',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'department',
		header: 'Department',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'through',
		header: 'Through',
		enableColumnFilter: true,
	},
];
