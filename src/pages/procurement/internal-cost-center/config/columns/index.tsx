import { ColumnDef } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';

import { IInternalCostCenterTableData } from './columns.type';

// * Internal Cost Center Columns
export const internalCostCenterColumns = (): ColumnDef<IInternalCostCenterTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'authorized_person_name',
		header: 'Authorized Person',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'from',
		header: 'From',
		enableColumnFilter: true,
		cell: (info) => <DateTime isTime={false} date={info.getValue() as Date} />,
	},
	{
		accessorKey: 'to',
		header: 'To',
		enableColumnFilter: true,
		cell: (info) => <DateTime isTime={false} date={info.getValue() as Date} />,
	},
	{
		accessorKey: 'budget',
		header: 'Budget',
		enableColumnFilter: true,
	},
];
