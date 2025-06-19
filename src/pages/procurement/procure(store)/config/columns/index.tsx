import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import FilePreview from '@/components/others/file-preview';
import { Badge } from '@/components/ui/badge';
import DateTime from '@/components/ui/date-time';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { cn } from '@/lib/utils';

import { IProcureStoreTableData } from './columns.type';

// * Capital
export const itemWorkOrderColumns = () // handleDetails: (row: Row<IProcureStoreTableData>) => void
: ColumnDef<IProcureStoreTableData>[] => [
	{
		accessorKey: 'item_work_order_id',
		header: 'ID',
		enableColumnFilter: true,
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
