import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';

import { ICapitalTableData } from './columns.type';

// * Capital
export const capitalColumns = (): ColumnDef<ICapitalTableData>[] => [
	{
		accessorKey: 'capital_id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'done',
		header: 'Done',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info.getValue() as number} />,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'sub_category',
		header: 'Sub Category',
		enableColumnFilter: true,
	},
];
