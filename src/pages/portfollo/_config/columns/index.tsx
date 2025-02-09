import { ColumnDef } from '@tanstack/react-table';

import {
	IAuthoritiesTableData,
	IBotTableData,
	ICertificateCourseFeeTableData,
	IDepartmentTableData,
	IFacultyTableData,
	IProgramTableData,
	ITuitionFeeTableData,
} from './columns.type';

// * Department
export const departmentColumns = (): ColumnDef<IDepartmentTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'faculty_name',
		header: 'Faculty',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
];

//* Program Columns
export const programColumns = (): ColumnDef<IProgramTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
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
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'short_biography',
		header: 'Short Biography',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
//* Certificate Course Fee Columns
export const certificateCourseFeeColumns = (): ColumnDef<ICertificateCourseFeeTableData>[] => [
	{
		accessorKey: 'program_name',
		header: 'Program',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'fee_per_course',
		header: 'Fee per Course',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
//* Tuition Fee Columns
export const tuitionFeeColumns = (): ColumnDef<ITuitionFeeTableData>[] => [
	{
		accessorKey: 'title',
		header: 'Title',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'program_name',
		header: 'Program',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'admission_fee',
		header: 'Admission Fee',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'tuition_fee_per_credit',
		header: 'Tuition Fee per Credit',
		enableColumnFilter: false,
		cell: (info) => info.getValue() || 0,
	},
	{
		accessorKey: 'student_activity_fee_per_semester',
		header: 'Student Activity Fee per Semester',
		enableColumnFilter: false,
		cell: (info) => info.getValue() || 0,
	},
	{
		accessorKey: 'library_fee_per_semester',
		header: 'Library Fee per Semester',
		enableColumnFilter: false,
		cell: (info) => info.getValue() || 0,
	},
	{
		accessorKey: 'computer_lab_fee_per_semester',
		header: 'Computer Lab Fee per Semester',
		enableColumnFilter: false,
		cell: (info) => info.getValue() || 0,
	},
	{
		accessorKey: 'science_lab_fee_per_semester',
		header: 'Science Lab Fee per Semester',
		enableColumnFilter: false,
		cell: (info) => info.getValue() || 0,
	},
	{
		accessorKey: 'studio_lab_fee',
		header: 'Studio Lab Fee',
		enableColumnFilter: false,
		cell: (info) => info.getValue() || 0,
	},
];

// * Faculty Columns
export const facultyColumns = (): ColumnDef<IFacultyTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
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
		enableColumnFilter: false,
	},
	{
		accessorKey: 'user_name',
		header: 'User Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: false,
	},
];
