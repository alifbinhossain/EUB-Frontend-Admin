import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import FilePreview from '@/components/others/file-preview';
import { Badge } from '@/components/ui/badge';
import DateTime from '@/components/ui/date-time';

import { cn } from '@/lib/utils';

import { IProcureStoreTableData } from './columns.type';

// * Capital
export const itemWorkOrderColumns = () // handleDetails: (row: Row<IProcureStoreTableData>) => void
: ColumnDef<IProcureStoreTableData>[] => [
	// {
	// 	accessorKey: 'item_work_order_id',
	// 	header: 'ID',
	// 	enableColumnFilter: true,
	// 	cell: (info) => (
	// 		<span onClick={() => handleDetails(info.row)} className='bold text-primary underline'>
	// 			{info.getValue() as string}
	// 		</span>
	// 	),
	// },
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
	// {
	// 	accessorKey: 'status',
	// 	header: 'Status',
	// 	enableColumnFilter: true,
	// 	cell: (info) => (
	// 		<Badge
	// 			className={cn(
	// 				info.getValue() === 'Requested' && 'bg-red-500 text-white',
	// 				info.getValue() === 'Pipeline' && 'bg-yellow-500 text-white',
	// 				info.getValue() === 'Decided' && 'bg-blue-500 text-white',
	// 				info.getValue() === 'Committed' && 'bg-teal-500 text-white',
	// 				info.getValue() === 'Paid' && 'bg-green-500 text-white'
	// 			)}
	// 		>
	// 			{info.getValue() as string}
	// 		</Badge>
	// 	),
	// },
	{
		accessorKey: 'work_order_file',
		header: 'Value',
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
