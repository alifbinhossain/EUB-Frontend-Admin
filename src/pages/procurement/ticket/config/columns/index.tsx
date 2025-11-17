import { ColumnDef, Row } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import { ITicketEntry, ITicketTableData } from './columns.type';

// * Ticket
export const ticketColumns = (
	handleDetails: (row: Row<ITicketTableData>) => void,
	handleResolved: (row: Row<ITicketTableData>) => void
): ColumnDef<ITicketTableData>[] => [
	{
		accessorKey: 'is_resolved',
		header: 'Resolved',
		enableColumnFilter: false,
		cell: (info) => (
			<Switch checked={info?.getValue() as boolean} onCheckedChange={() => handleResolved(info.row)} />
		),
		size: 40,
	},
	{
		accessorKey: 'req_ticket_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => (
			<span onClick={() => handleDetails(info.row)} className='bold text-primary underline'>
				{info.getValue() as string}
			</span>
		),
		size: 120,
	},
	{
		accessorKey: 'department',
		header: 'Department',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'problem_description',
		header: 'Problem Description',
		enableColumnFilter: false,
	},
];

// * Ticket Entry
export const ticketEntryColumns = (): ColumnDef<ITicketEntry>[] => [
	{
		accessorKey: 'item_name',
		header: 'Item',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: true,
		cell: (info) => {
			const quantity = info.getValue() as number;
			const unit = info.row.original.unit || '';
			return `${quantity} ${unit}`;
		},
	},
];
