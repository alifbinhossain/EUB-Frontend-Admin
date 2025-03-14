import { ColumnDef } from '@tanstack/react-table';

import { IGeneralNoteTableData } from './columns.type';

// * Inquiry
export const generalNoteColumns = (): ColumnDef<IGeneralNoteTableData>[] => [
	{
		accessorKey: 'service_name',
		header: 'Service',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableColumnFilter: true,
	},
];
