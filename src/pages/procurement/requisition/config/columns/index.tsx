import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import DateTime from '@/components/ui/date-time';

import { cn } from '@/lib/utils';

import { IRequisitionTableData } from './columns.type';

// * Requisition Table Columns
export const requisitionColumns = (): ColumnDef<IRequisitionTableData>[] => [
	{
		accessorKey: 'internal_cost_center_name',
		header: 'Internal Cost Center',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'is_received',
		header: 'Received',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'received_date',
		header: 'Price Validity',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'department',
		header: 'Department',
		enableColumnFilter: true,
	},
];
