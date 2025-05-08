import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';

import { IItemWorkOrderEntryTableData, IItemWorkOrderTableData } from './columns.type';

// * Item Work Order Entry
export const itemWorkOrderEntryColumns = (
	handleDetails: (row: Row<IItemWorkOrderTableData>) => void
): ColumnDef<IItemWorkOrderTableData>[] => [
	{
		accessorKey: 'item_work_order_id',
		header: 'ID',
		enableColumnFilter: true,
		cell: (info) => (
			<span onClick={() => handleDetails(info.row)} className='bold text-primary underline'>
				{info.getValue() as string}
			</span>
		),
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

// * Item Work Order Entry
export const itemWorkOrderEntry = (): ColumnDef<IItemWorkOrderEntryTableData>[] => [
	{
		accessorKey: 'item_name',
		header: 'Item',
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'unit_price',
		header: 'Unit Price',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'is_received',
		header: 'Received',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info?.getValue() as boolean} />,
	},
];
