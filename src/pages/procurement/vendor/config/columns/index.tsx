import { ColumnDef } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';

import { IVendorTableData } from './columns.type';

// name: '',
// phone: '',
// product_type: '',
// address: '',
// purpose: '',
// starting_date: '',
// ending_date: '',
// remarks: null,

// * Vendor
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
	{
		accessorKey: 'product_type',
		header: 'Product Type',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'address',
		header: 'Address',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'purpose',
		header: 'Purpose',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'starting_date',
		header: 'Starting Date',
		enableColumnFilter: true,
		cell: (info) => {
			const date = info.getValue();
			return <DateTime date={date as Date} isTime={false} />;
		},
	},
	{
		accessorKey: 'ending_date',
		header: 'Ending Date',
		enableColumnFilter: true,
		cell: (info) => {
			const date = info.getValue();
			return <DateTime date={date as Date} isTime={false} />;
		},
	},
];
