import { ColumnDef } from '@tanstack/react-table';

import { IItemWorkOrderTableData } from './columns.type';

// * Item Work Order Entry
export const itemWorkOrderEntryColumns = (): ColumnDef<IItemWorkOrderTableData>[] => [
	{
		accessorKey: 'item_work_order_id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor Name',
	},
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
