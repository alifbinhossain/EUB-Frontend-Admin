import { ColumnDef } from '@tanstack/react-table';

import { IServiceTableData } from './columns.type';

// * Service
export const serviceColumns = (): ColumnDef<IServiceTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: false,
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
	{
		accessorKey: 'vendor_name',
		header: 'Vendor Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'frequency',
		header: 'Frequency',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'start_date',
		header: 'Start Date',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'end_date',
		header: 'End Date',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'next_due_date',
		header: 'Next Due Date',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'cost_per_service',
		header: 'Cost Per Service',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'payment_terms',
		header: 'Payment Terms',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'approval_required',
		header: 'Approval Required',
		enableColumnFilter: false,
	},
];
