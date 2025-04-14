import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import ColumnAvatar from '@/components/core/data-table/_views/column-avatar';

import { IFeatureTableData } from './columns.type';

// * Feature Columns
export const featureColumns = (): ColumnDef<IFeatureTableData>[] => [
	{
		accessorKey: 'is_active',
		header: 'Active',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info.getValue() as number} />,
	},
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: true,
	},

	{
		accessorKey: 'file',
		header: 'Cover',
		enableColumnFilter: true,
		cell: (info) => <ColumnAvatar src={info.getValue() as string} alt={info.row.original.title} />,
	},
	{
		accessorKey: 'title',
		header: 'Title',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: true,
	},
];
