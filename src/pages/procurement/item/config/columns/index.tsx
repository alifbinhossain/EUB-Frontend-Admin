import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import DateTime from '@/components/ui/date-time';

import { IItemTableData, IItemVendorTableData } from './columns.type';

// * Item
export const itemColumns = (
	actionTrxAccess: boolean,
	handleTrx: (row: Row<IItemTableData>) => void,
	handleDetails: (row: Row<IItemTableData>) => void
): ColumnDef<IItemTableData>[] => [
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: true,
	},
	{
		id: 'vendors',
		header: 'Vendors',
		cell: (info) => <Transfer onClick={() => handleDetails(info.row)} />,
		size: 40,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'purchase_cost_center_name',
		header: 'Purchase Cost Center',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'vendor_price',
		header: 'Vendor Price',
		enableColumnFilter: true,
	},

	{
		accessorKey: 'price_validity',
		header: 'Price Validity',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: true,
	},
	{
		id: 'action_trx',
		header: 'Item Transfer',
		cell: (info) => <Transfer onClick={() => handleTrx(info.row)} />,
		size: 40,
		meta: {
			hidden: !actionTrxAccess,
			disableFullFilter: true,
		},
	},
	{
		accessorKey: 'unit',
		header: 'Unit',
		enableColumnFilter: true,
	},
];
// * vendor
export const vendorColumns = (): ColumnDef<IItemVendorTableData>[] => [
	{
		accessorKey: 'is_active',
		header: 'Active',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info.getValue() as number} />,
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: true,
	},
];
