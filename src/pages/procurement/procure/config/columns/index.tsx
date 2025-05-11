import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';

import { ICapitalTableData, IGeneralNotesTableData, IQuotationTableData } from './columns.type';

// * Capital
export const capitalColumns = (
	handleDetails: (row: Row<ICapitalTableData>) => void
): ColumnDef<ICapitalTableData>[] => [
	{
		accessorKey: 'capital_id',
		header: 'ID',
		enableColumnFilter: true,
		cell: (info) => (
			<span onClick={() => handleDetails(info.row)} className='bold text-primary underline'>
				{info.getValue() as string}
			</span>
		),
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
		accessorKey: 'sub_category_name',
		header: 'Sub Category',
		enableColumnFilter: true,
	},
];

export const quotationsColumns = (): ColumnDef<IQuotationTableData>[] => [
	{
		accessorKey: 'is_selected',
		header: 'Selected',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info.getValue() as number} />,
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'capital_name',
		header: 'Capital',
		enableColumnFilter: true,
	},
];

export const generalNotesColumns = (): ColumnDef<IGeneralNotesTableData>[] => [
	{
		accessorKey: 'capital_name',
		header: 'Capital',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: true,
	},
];
