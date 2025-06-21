import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import TableCellAction from '@/components/core/data-table/_components/cell-action';
import DateTime from '@/components/ui/date-time';

import {
	IITemRequestTableData,
	IItemRequisitionTableData,
	IITemTransferTableData,
	IItemWorkOrderEntryTableData,
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
export const itemWorkOrderEntryColumns = (): ColumnDef<IItemWorkOrderEntryTableData>[] => [
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
export const itemRequestColumns = ({ updateAccess, deleteAccess }: any): ColumnDef<IITemRequestTableData>[] => [
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
	{
		accessorKey: 'created_by_name',
		header: 'Created By',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'created_at',
		header: 'Created At',
		enablePinning: false,
		cell: (info) => <DateTime date={info.getValue() as Date} />,
		// filterFn: 'dateRange',
		meta: {
			filterVariant: 'dateRange',
		},
	},
	{
		accessorKey: 'updated_at',
		header: 'Updated At',
		enablePinning: false,
		cell: (info) => <DateTime date={info.getValue() as Date} />,
		meta: {
			filterVariant: 'dateRange',
		},
	},

	{
		id: 'actions',
		accessorKey: 'actions',
		header: () => <p className='text-center'>Actions</p>,
		enableColumnFilter: false,
		enableSorting: false,
		enableHiding: false,
		cell: (info) => (
			<TableCellAction
				info={info}
				hiddenUpdate={!!info.row.original.item_work_order_uuid}
				hiddenDelete={!!info.row.original.item_work_order_uuid}
			/>
		),
		size: 60,
		meta: {
			hidden: !updateAccess && !deleteAccess,
			disableFullFilter: true,
		},
	},
];
