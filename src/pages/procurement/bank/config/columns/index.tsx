import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';

import { cn } from '@/lib/utils';

import { IBankTableData } from './columns.type';

// * Bank
export const bankColumns = (): ColumnDef<IBankTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'swift_code',
		header: 'Swift Code',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'address',
		header: 'Address',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'routing_no',
		header: 'Routing No',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'account_no',
		header: 'Account No',
		enableColumnFilter: true,
	},
];
