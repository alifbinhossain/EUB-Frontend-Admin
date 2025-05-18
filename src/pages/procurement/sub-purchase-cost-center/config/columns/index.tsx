import { ColumnDef } from '@tanstack/react-table';

import { ISubPurchaseCostCenterTableData } from './columns.type';

// * Purchase Cost Center
export const subPurchaseCostCenterColumns = (): ColumnDef<ISubPurchaseCostCenterTableData>[] => [
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: true,
		cell: (info) => Number(info.getValue()) + 1,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'purchase_cost_center_name',
		header: 'Category',
		enableColumnFilter: true,
	},
];
