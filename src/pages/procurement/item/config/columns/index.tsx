import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import TableCellAction from '@/components/core/data-table/_components/cell-action';
import HoverCardWrapper from '@/components/others/hover-card-wrapper';
import DateTime from '@/components/ui/date-time';

import { cn } from '@/lib/utils';

import { IItemTableData } from './columns.type';

// * Item
export const itemColumns = (
	actionTrxAccess: boolean,
	handleTrx: (row: Row<IItemTableData>) => void
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
