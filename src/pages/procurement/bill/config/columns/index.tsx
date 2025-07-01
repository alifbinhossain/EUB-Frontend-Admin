import { ColumnDef } from '@tanstack/react-table';

import { CustomLink } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import { IBillPaymentTableData, IBillTableData, IItemWorkOrderTableData } from './columns.type';

// * Bill
export const billColumns = (): ColumnDef<IBillTableData>[] => [
	{
		accessorKey: 'bill_id',
		header: 'ID',
		enableColumnFilter: true,
		cell: (info) => (
			<CustomLink label={info.getValue() as string} url={`/procurement/bill/${info.row.original.uuid}/details`} />
		),
		size: 180,
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'bank_name',
		header: 'Bank',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'total_amount',
		header: 'Total Bill',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'total_bill_amount',
		header: 'Total Paid',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'remaining_amount',
		header: 'Due',
		enableColumnFilter: true,
		cell: (info) => {
			return (
				<span className='text-red-500'>
					{info.row.original.total_amount - info.row.original.total_bill_amount}
				</span>
			);
		},
	},
];

//* Item Work Order
export const itemWorkOrderColumns = (): ColumnDef<IItemWorkOrderTableData>[] => [
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
];

//*Bill Payment
export const billPaymentColumns = (): ColumnDef<IBillPaymentTableData>[] => [
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'payment_method',
		header: 'Payment Method',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'payment_date',
		header: 'Date',
		enableColumnFilter: true,
		cell: (info) => {
			return <DateTime date={info.getValue() as Date} isTime={false} />;
		},
	},
];
