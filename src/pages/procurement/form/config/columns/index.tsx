import { ColumnDef } from '@tanstack/react-table';

import FilePreview from '@/components/others/file-preview';

import { IFormTableData } from './columns.type';

// * Form
export const formColumns = (): ColumnDef<IFormTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'file',
		header: 'File',
		enableColumnFilter: true,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},
];
