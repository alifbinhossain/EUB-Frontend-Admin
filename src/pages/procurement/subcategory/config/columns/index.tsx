import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';

import { cn } from '@/lib/utils';

import { ISubCategoryTableData } from './columns.type';

// * Sub-Category
export const subCategoryColumns = (): ColumnDef<ISubCategoryTableData>[] => [
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
		accessorKey: 'category_name',
		header: 'Category',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'min_amount',
		header: 'Min Amount',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'min_quotation',
		header: 'Min Quotation',
		enableColumnFilter: true,
	},
];
