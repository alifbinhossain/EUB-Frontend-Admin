import { ColumnDef } from '@tanstack/react-table';

import { ICapitalTableData } from './columns.type';

// * Service
export const capitalColumns = (): ColumnDef<ICapitalTableData>[] => [
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
