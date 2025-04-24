import { ColumnDef } from '@tanstack/react-table';

import Transfer from '@/components/buttons/transfer';
import DateTime from '@/components/ui/date-time';

import { IItemTableData, IVendorTableData } from './columns.type';

// * Vendor
export const vendorColumns = (handleDetails: any): ColumnDef<IVendorTableData>[] => [
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
		id: 'items',
		header: 'Items',
		cell: (info) => <Transfer onClick={() => handleDetails(info.row)} />,
		size: 40,
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
// * Item
export const itemColumns = (): ColumnDef<IItemTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'vendor_price',
		header: 'Price',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'unit',
		header: 'Unit',
		enableColumnFilter: true,
	},
];
