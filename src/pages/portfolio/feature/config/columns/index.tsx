import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import ColumnImage from '@/components/core/data-table/_views/column-image';
import TooltipWrapper from '@/components/others/tooltip-wrapper';

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
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: true,
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
		cell: (info) => <ColumnImage src={info.getValue() as string} alt={info.row.original.title} />,
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
		cell: (info) => (
			<TooltipWrapper message={info.getValue() as string}>
				<div className='max-w-[200px] truncate'>{info.getValue() as string}</div>
			</TooltipWrapper>
		),
	},
];
