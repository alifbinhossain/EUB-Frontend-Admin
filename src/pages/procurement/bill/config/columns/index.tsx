import { ColumnDef } from '@tanstack/react-table';

import { IBillTableData } from './columns.type';

// * Capital
export const billColumns = (): ColumnDef<IBillTableData>[] => [
	{
		accessorKey: 'bill_id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'bank_name',
		header: 'Bank',
		enableColumnFilter: true,
	},
];
