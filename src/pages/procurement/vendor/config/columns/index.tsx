import { ColumnDef } from '@tanstack/react-table';

import { IVendorTableData } from './columns.type';

// * Inquiry
export const vendorColumns = (): ColumnDef<IVendorTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		enableColumnFilter: true,
	},
];
