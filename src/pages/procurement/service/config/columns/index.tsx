import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import DateTime from '@/components/ui/date-time';

import { cn } from '@/lib/utils';

import { IItemWorkOrderTableData, IServiceTableData } from './columns.type';

// * Item Work Order Entry
export const itemWorkOrderEntryColumns = (): ColumnDef<IItemWorkOrderTableData>[] => [
	{
		accessorKey: 'vendor_name',
		header: 'Vendor Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: true,
	},
];

// * Service
export const serviceColumns = (): ColumnDef<IServiceTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'sub_category',
		header: 'Sub Category',
		enableColumnFilter: true,
	},
];
