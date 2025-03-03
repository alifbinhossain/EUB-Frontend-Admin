import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import { RichTextModal } from '@/components/core/modal';
import FilePreview from '@/components/others/file-preview';
import { LinkWithRedirect } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import { API_IMAGE_URL } from '@/lib/secret';

import { categories as authoritiesCategories } from '../../authorities/utils';
import { categories as botCategories, status as botStatus } from '../../boardOfTrustees/utils';
import { InfoLinks } from '../../info/utils';
import { categories as officeCategories } from '../../office/utills';
import {
	IAuthoritiesTableData,
	IBotTableData,
	IDepartmentTableData,
	IDepartmentTeachersTableData,
	IFacultyTableData,
	IInfoTableData,
	IOffersTableData,
	IOfficeEntryTableData,
	IOfficeTableData,
	IRoutineTableData,
} from './columns.type';

// * Department
export const departmentColumns = (): ColumnDef<IDepartmentTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
		cell: (info) => {
			const link = info.row.original.page_link;
			return <LinkWithRedirect baseUrlNeeded={false} uri={link} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'short_name',
		header: 'Short Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'faculty_name',
		header: 'Faculty',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
		cell: (info) => <span className='capitalize'>{info?.getValue() as string}</span>,
	},
];

//* Program Columns
export const programColumns = (): ColumnDef<IInfoTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
		cell: (info) => <span className='capitalize'>{info?.getValue() as string}</span>,
	},
];
//* Authorities Columns
export const authoritiesColumns = (): ColumnDef<IAuthoritiesTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'user_name',
		header: 'User',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'phone',
		header: 'User',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'email',
		header: 'User',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
		cell: (info) => {
			const category = authoritiesCategories.find((item) => item.value === info.getValue());
			return <LinkWithRedirect uri={`/authorities/${category?.link}`} title={category?.label as string} />;
		},
	},
	{
		accessorKey: 'short_biography',
		header: 'Short Biography',
		enableColumnFilter: false,
	},
];

// * Faculty Columns
export const facultyColumns = (): ColumnDef<IFacultyTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
];

// * Info Columns
export const infoColumns = (): ColumnDef<IInfoTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'page_name',
		header: 'Page Name',
		enableColumnFilter: true,
		cell: (info) => {
			const category = InfoLinks.find((item) => item.value === info.getValue());
			return <LinkWithRedirect uri={`${category?.link}`} title={category?.label as string} />;
		},
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'file',
		header: 'File',
		enableColumnFilter: true,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},
];

// * Routine Columns
export const routineColumns = (): ColumnDef<IRoutineTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'department_name',
		header: 'Department Name',
		enableColumnFilter: true,
		cell: (info) => {
			const link = info.row.original.page_link;
			return <LinkWithRedirect baseUrlNeeded={false} uri={link} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'programs',
		header: 'Programs',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'is_global',
		header: 'Global',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info.getValue() as number} />,
	},
	{
		accessorKey: 'file',
		header: 'File',
		enableColumnFilter: true,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},
];

//* BOT Columns
export const botColumns = (): ColumnDef<IBotTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
		cell: (info) => {
			const category = botCategories.find((item) => item.value === info.getValue());
			return <LinkWithRedirect uri={`${category?.link}`} title={category?.label as string} />;
		},
	},
	{
		accessorKey: 'user_name',
		header: 'User Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'user_designation',
		header: 'Designation',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			const category = botStatus.find((item) => item.value === info.getValue());
			return <span className='capitalize'>{category?.label ?? ''}</span>;
		},
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: false,
	},
];

// * Department-Teachers Columns
export const departmentTeachersColumns = (): ColumnDef<IDepartmentTeachersTableData>[] => [
	{
		accessorKey: 'department_name',
		header: 'Department',
		enableColumnFilter: true,
		cell: (info) => {
			const link = info.row.original.page_link;
			return <LinkWithRedirect baseUrlNeeded={false} uri={link} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'teacher_name',
		header: 'Teacher',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'teacher_image',
		header: 'Image',
		enableColumnFilter: false,
		cell: (info) => <img className='h-10 w-10 rounded-full' src={API_IMAGE_URL + info.getValue()} alt='' />,
	},
	{
		accessorKey: 'teacher_designation',
		header: 'Designation',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'teacher_email',
		header: 'Email',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'teacher_phone',
		header: 'Phone',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},

	{
		accessorKey: 'teacher_name',
		header: 'Teacher',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'department_head',
		header: 'Department Head',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info?.getValue() as boolean} />,
	},
	{
		accessorKey: 'education',
		header: 'Education',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'about',
		header: 'About',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'appointment_date',
		header: 'Appointment Date',
		enableColumnFilter: true,
		cell: (info) => <DateTime isTime={false} date={info.getValue() as Date} />,
	},
	{
		accessorKey: 'resign_date',
		header: 'Resign Date',
		enableColumnFilter: true,
		cell: (info) => <DateTime isTime={false} date={info.getValue() as Date} />,
	},
	{
		accessorKey: 'publication',
		header: 'Publications',
		enableColumnFilter: true,
		cell: (info) => <RichTextModal title={'Publications'} content={info.getValue() as string} />,
	},
	{
		accessorKey: 'journal',
		header: 'Journal',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
];

//* Office
export const officeColumns = (): ColumnDef<IOfficeTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'title',
		header: 'Title',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,

		cell: (info) => {
			const category = officeCategories.find((item) => item.value === info.getValue());
			return (
				<LinkWithRedirect uri={`/authorities/offices/${category?.link}`} title={category?.label as string} />
			);
		},
	},
	{
		accessorKey: 'image',
		header: 'Image',
		enableColumnFilter: false,
		cell: (info) => <img className='h-10 w-10 rounded-full' src={API_IMAGE_URL + info.getValue()} alt='' />,
	},
];
//*Office Entry
export const officeEntryColumns = (): ColumnDef<IOfficeEntryTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'user_name',
		header: 'User',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'designation',
		header: 'Designation',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		enableColumnFilter: true,
	},
];
// * Offers Columns
export const offersColumns = (): ColumnDef<IOffersTableData>[] => [
	{
		accessorKey: 'serial',
		header: 'Serial',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'title',
		header: 'Title',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'file',
		header: 'File',
		enableColumnFilter: true,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},

	{
		accessorKey: 'subtitle',
		header: 'Subtitle',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'deadline',
		header: 'Deadline',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];
