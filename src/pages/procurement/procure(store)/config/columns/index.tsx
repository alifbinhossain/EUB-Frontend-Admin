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
		accessorKey: 'done',
		header: 'Done',
		enableColumnFilter: false,
		size: 100,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'item_work_order_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => (
			<CustomLink
				label={info.getValue() as string}
				url={`/procurement/procure-store/${info.row.original.uuid}/details`}
			/>
		),
		size: 100,
	},
	{
		accessorKey: 'total_amount',
		header: 'Total \nAmount',
		enableColumnFilter: false,
		size: 100,
	},

	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'work_order_file',
		header: 'Work Order \nFile',
		enableColumnFilter: false,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},
	// {
	// 	accessorKey: 'work_order_remarks',
	// 	header: 'Work Order \nRemarks',
	// 	enableColumnFilter: false,
	// },
	{
		accessorKey: 'without_item_request',
		header: 'Without \nRequest',
		enableColumnFilter: false,
		size: 100,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'delivery_statement_file',
		header: 'Delivery \nStatement File',
		enableColumnFilter: false,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},
	{
		accessorKey: 'is_delivery_statement',
		header: 'Delivery \nStatement',
		enableColumnFilter: false,
		cell: (info) => {
			const { is_delivery_statement, delivery_statement_date } = info.row.original;

			return (
				<div className='flex items-center gap-2'>
					<StatusButton value={is_delivery_statement as boolean} />
					<DateTime date={new Date(delivery_statement_date)} />
				</div>
			);
		},
	},

	// {
	// 	accessorKey: 'delivery_statement_remarks',
	// 	header: 'Delivery \nStatement Remarks',
	// 	enableColumnFilter: false,
	// },

	// {
	// 	accessorKey: 'done_date',
	// 	header: 'Done Date',
	// 	enableColumnFilter: false,
	// 	cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	// },
];

export const itemWorkOrderEntry = (): ColumnDef<IItemsWorkOrderEntryTableData>[] => [
	{
		accessorKey: 'item_name',
		header: 'Item',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'request_quantity',
		header: 'Request Quantity',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'provided_quantity',
		header: 'Provided Quantity',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'unit_price',
		header: 'Unit Price',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'total_amount',
		header: 'Total Amount',
		enableColumnFilter: false,
		cell: (info) => <span>{info.row.original.provided_quantity * info.row.original.unit_price}</span>,
	},
];
