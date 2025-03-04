import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import { RichTextModal } from '@/components/core/modal';
import FilePreview from '@/components/others/file-preview';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import { API_IMAGE_URL } from '@/lib/secret';

import { tableNames } from '../../tender/utills';
import {
	IClubTableData,
	IJobCircularTableData,
	INewsTableData,
	IPolicyTableData,
	ITenderTableData,
} from './columns.type';

// * Job Circular Columns
export const jobCircularColumns = (): ColumnDef<IJobCircularTableData>[] => [
	{
		accessorKey: 'title',
		header: 'Title',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'faculty_name',
		header: 'Faculty Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'location',
		header: 'Location',
		enableColumnFilter: true,
	},

	{
		accessorKey: 'file',
		header: 'File',
		enableColumnFilter: true,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},

	{
		accessorKey: 'deadline',
		header: 'Deadline',
		enableColumnFilter: true,
		cell: (info) => <DateTime isTime={false} date={info.getValue() as Date} />,
	},
];

// * Club Columns
export const clubColumns = (): ColumnDef<IClubTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'department_name',
		header: 'Department',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'president_name',
		header: 'President',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'president_phone',
		header: 'Phone',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'president_email',
		header: 'Email',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'message',
		header: 'Message',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
];

// * News
export const newsColumns = (): ColumnDef<INewsTableData>[] => [
	{
		accessorKey: 'title',
		header: 'Title',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'subtitle',
		header: 'Subtitle',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'content',
		header: 'Content',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'cover_image',
		header: 'Cover Image',
		enableColumnFilter: true,
		cell: (info) => <img className='h-10 w-10 rounded-full' src={API_IMAGE_URL + info.getValue()} alt='' />,
	},
	{
		accessorKey: 'published_date',
		header: 'Published Date',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'department_name',
		header: 'Department',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
];

//* Policy Columns
export const policyColumns = (): ColumnDef<IPolicyTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'department',
		header: 'Department',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'published_date',
		header: 'Published Date',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'file',
		header: 'File',
		enableColumnFilter: true,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},
];

//* Tender
export const tenderColumns = (): ColumnDef<ITenderTableData>[] => [
	{
		accessorKey: 'table_name',
		header: 'Table Name',
		enableColumnFilter: true,
		cell: (info) => {
			const table_name = tableNames.find((item) => item.value === info.getValue());
			return <span>{table_name?.label ?? ''}</span>;
		},
	},
	{
		accessorKey: 'title',
		header: 'Title',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'published_date',
		header: 'Published Date',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'file',
		header: 'File',
		enableColumnFilter: true,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},
];
