import { ColumnDef } from '@tanstack/react-table';

import { IPipelineTableData, IReportItemTableData } from './columns.type';

// * Report Item Columns
export const reportItemColumns = (): ColumnDef<IReportItemTableData>[] => [
	{
		accessorKey: 'item_name',
		header: 'Item',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'unit',
		header: 'Unit',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'item_opening_quantity',
		header: 'Opening',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'item_purchased_quantity',
		header: 'Purchased',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'item_consumption_quantity',
		header: 'Consumption',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'item_closing_quantity',
		header: 'Closing',
		enableColumnFilter: true,
	},
];
// * Report Item Columns
export const reportPipelineColumns = (): ColumnDef<IPipelineTableData>[] => [
	{
		accessorKey: 'item_name',
		header: 'Item',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'req_quantity',
		header: 'Requested Quantity',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'provided_quantity',
		header: 'Provided Quantity',
		enableColumnFilter: true,
	},
];
