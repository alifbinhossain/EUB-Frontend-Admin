import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import DateTime from '@/components/ui/date-time';

import { IItemTableData, IItemVendorTableData } from './columns.type';

// * Item
export const itemColumns = (
	actionTrxAccess: boolean,
	handleTrx: (row: Row<IItemTableData>) => void,
	handleDetails: (row: Row<IItemTableData>) => void,
	handleRequest: (row: Row<IItemTableData>) => void
): ColumnDef<IItemTableData>[] => [
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
		cell: (info) => (
			<span onClick={() => handleDetails(info.row)} className='bold text-primary underline'>
				{info.getValue() as string}
			</span>
		),
	},
	{
		accessorKey: 'purchase_cost_center_name',
		header: 'Category',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'sub_purchase_cost_center_name',
		header: 'Sub Category',
		enableColumnFilter: true,
	},
	// {
	// 	accessorKey: 'vendor_price',
	// 	header: 'Vendor Price',
	// 	enableColumnFilter: true,
	// },

	// {
	// 	accessorKey: 'price_validity',
	// 	header: 'Price Validity',
	// 	enableColumnFilter: true,
	// 	cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	// },
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'threshold',
		header: 'Threshold',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'lead_time',
		header: 'Lead Time',
		enableColumnFilter: true,
	},

	{
		accessorKey: 'unit',
		header: 'Unit',
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
		id: 'request_action_trx',
		header: 'Request Item',
		cell: (info) => <Transfer onClick={() => handleRequest(info.row)} />,
		size: 40,
		meta: {
			hidden: !actionTrxAccess,
			disableFullFilter: true,
		},
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
