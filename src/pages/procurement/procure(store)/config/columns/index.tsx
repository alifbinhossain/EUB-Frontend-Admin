import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import FilePreview from '@/components/others/file-preview';
import { CustomLink } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import { IItemsWorkOrderEntryTableData, IProcureStoreTableData } from './columns.type';

// * Procure Store
export const itemWorkOrderColumns = () // handleDetails: (row: Row<IProcureStoreTableData>) => void
: ColumnDef<IProcureStoreTableData>[] => [
	{
		accessorKey: 'item_work_order_id',
		header: 'ID',
		enableColumnFilter: true,
		cell: (info) => (
			<CustomLink
				label={info.getValue() as string}
				url={`/procurement/procure-store/${info.row.original.uuid}/details`}
			/>
		),
		size: 180,
	},
	{
		accessorKey: 'total_amount',
		header: 'Total Amount',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'bill_name',
		header: 'Bill',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'work_order_file',
		header: 'Work Order File',
		enableColumnFilter: true,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},
	{
		accessorKey: 'work_order_remarks',
		header: 'Work Order Remarks',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'is_delivery_statement',
		header: 'Delivery Statement',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'delivery_statement_date',
		header: 'Work Order Remarks',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'delivery_statement_file',
		header: 'Delivery Statement File',
		enableColumnFilter: true,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},
	{
		accessorKey: 'delivery_statement_remarks',
		header: 'Delivery Statement Remarks',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'done',
		header: 'Done',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'done_date',
		header: 'Done Date',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];

export const itemWorkOrderEntry = (): ColumnDef<IItemsWorkOrderEntryTableData>[] => [
	{
		accessorKey: 'item_name',
		header: 'Item',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'request_quantity',
		header: 'Request Quantity',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'provided_quantity',
		header: 'Provided Quantity',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'unit_price',
		header: 'Unit Price',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'total_amount',
		header: 'Total Amount',
		enableColumnFilter: true,
		cell: (info) => <span>{info.row.original.provided_quantity * info.row.original.unit_price}</span>,
	},
];
