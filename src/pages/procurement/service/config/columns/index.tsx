import { ColumnDef, Row } from '@tanstack/react-table';
import { addMonths, format } from 'date-fns';

import StatusButton from '@/components/buttons/status';
import DateTime from '@/components/ui/date-time';

import { IServicePayment, IServiceTableData } from './columns.type';

// * Service
export const serviceColumns = (
	handleDetails: (row: Row<IServiceTableData>) => void
): ColumnDef<IServiceTableData>[] => [
	{
		accessorKey: 'service_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => (
			<span onClick={() => handleDetails(info.row)} className='bold text-primary underline'>
				{info.getValue() as string}
			</span>
		),
		size: 100,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'frequency',
		header: 'Frequency /\nYear',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'start_date',
		header: 'Start Date',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'end_date',
		header: 'End Date',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'next_due_date',
		header: 'Next \nDue Date',
		enableColumnFilter: true,
		cell: (info) => {
			const date = info.getValue() as Date;
			return <DateTime date={date as Date} isTime={false} />;
		},
	},
	{
		accessorKey: 'cost_per_service',
		header: 'Cost /\nService',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'payment_terms',
		header: 'Payment\nTerms',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'approval_required',
		header: 'Approval\nRequired',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info?.getValue() as boolean} />,
	},
];

// * Service Payment
export const servicePaymentColumns = (): ColumnDef<IServicePayment>[] => [
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'next_due_date',
		header: 'Next Due Date',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'payment_date',
		header: 'Payment Date',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];
