import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import DateTime from '@/components/ui/date-time';

import { cn } from '@/lib/utils';

import { IPurchaseCostCenterTableData } from './columns.type';

// * Purchase Cost Center
export const purchaseCostCenterColumns = (): ColumnDef<IPurchaseCostCenterTableData>[] => [
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'sub_category_name',
		header: 'Sub Category',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'from',
		header: 'From',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'to',
		header: 'To',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'budget',
		header: 'Budget',
		enableColumnFilter: true,
	},
];
