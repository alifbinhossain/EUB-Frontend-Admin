import { ColumnDef } from '@tanstack/react-table';
import { Download } from 'lucide-react';

import FilePreview from '@/components/others/file-preview';
import { buttonVariants } from '@/components/ui/button';

import { API_IMAGE_URL } from '@/lib/secret';

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
