import { ColumnDef, Row } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import { ISemesterTableData } from './columns.type';

// * Semester Table Columns
export const semesterTableColumns = (): ColumnDef<ISemesterTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Semester Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'started_at',
		header: 'Started At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'mid_started_at',
		header: 'Mid Started At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'final_started_at',
		header: 'Final Started At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'ended_at',
		header: 'Ended At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];
