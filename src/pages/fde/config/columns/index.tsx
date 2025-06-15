import { ColumnDef, Row } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import { IQuestionCategoryTableData, IQuestionTableData } from './columns.type';

// * Question Category Columns
export const questionCategoryColumns = (): ColumnDef<IQuestionCategoryTableData>[] => [
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'name',
		header: 'Semester Name',
		enableColumnFilter: true,
	},
];

//*FDE Question
export const questionColumns = ({
	handleActive,
}: {
	handleActive: (row: Row<any>) => void;
}): ColumnDef<IQuestionTableData>[] => [
	{
		accessorKey: 'active',
		header: 'Active',
		enableColumnFilter: true,
		cell: (info) => <Switch checked={info.getValue() as boolean} onCheckedChange={() => handleActive(info.row)} />,
	},
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
		accessorKey: 'qsn_category_name',
		header: 'Question Category',
		enableColumnFilter: true,
	},
];
