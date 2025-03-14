import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';

import { cn } from '@/lib/utils';

import { ICategoryTableData } from './columns.type';

// * Inquiry
export const categoryColumns = (): ColumnDef<ICategoryTableData>[] => [
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'is_capital',
		header: 'Is Capital',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info?.getValue() as boolean} />,
	},
];
