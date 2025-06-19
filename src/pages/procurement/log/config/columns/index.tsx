import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import DateTime from '@/components/ui/date-time';

import {
	IITemRequestTableData,
	IItemRequisitionTableData,
	IITemTransferTableData,
	IItemWorkOrderTableData,
} from './columns.type';

// * Vendor
export const vendorColumns = (): ColumnDef<IITemTransferTableData>[] => [
	{
		accessorKey: 'is_requisition_received',
		header: 'Requisition Received',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info.getValue() as number} />,
	},
	{
		accessorKey: 'item_name',
		header: 'Item Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
		enableColumnFilter: true,
	},
];
// * Item work Order Entry
export const itemWorkOrderColumns = (): ColumnDef<IItemWorkOrderTableData>[] => [
	{
		accessorFn: (row) => row.received_date,
		header: 'Received',
		enableColumnFilter: true,
		cell: (info) => (
			<div>
				<StatusButton value={info.row.original.is_received as boolean} />
				<DateTime date={info.getValue() as Date} isTime={false} />
			</div>
		),
	},
	{
		accessorKey: 'item_work_order_id',
		header: 'Item Work Order',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'item_name',
		header: 'Item Name',
		enableColumnFilter: true,
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
];
// * Item Requisition
export const itemRequisitionColumns = (): ColumnDef<IItemRequisitionTableData>[] => [
	{
		accessorKey: 'item_name',
		header: 'Item Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'requisition_id',
		header: 'Requisition',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'req_quantity',
		header: 'Requested',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'provided_quantity',
		header: 'Provided',
		enableColumnFilter: true,
	},
];

// * Item Request Table
export const itemRequestColumns = (): ColumnDef<IITemRequestTableData>[] => [
	{
		accessorKey: 'item_work_order_id',
		header: 'Item Work Order ID',
		enableColumnFilter: true,
	},
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
