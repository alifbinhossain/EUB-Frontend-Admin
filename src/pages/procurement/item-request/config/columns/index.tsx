import { ColumnDef } from '@tanstack/react-table';

import { IITemRequestTableData } from './columns.type';

// * Item Request Table
export const itemRequestColumns = (): ColumnDef<IITemRequestTableData>[] => [
	{
		accessorKey: 'item_name',
		header: 'Item Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'request_quantity',
		header: 'Request Quantity',
		enableColumnFilter: true,
	},
];
