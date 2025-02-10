import { ColumnDef } from '@tanstack/react-table';

import { API_IMAGE_URL } from '@/lib/secret';

import { categories as authoritiesCategories } from '../../authorities/utils';
import { categories as botCategories } from '../../bot/utils';
import { categories as officeCategories } from '../../office/utills';
import {
	IAuthoritiesTableData,
	IBotTableData,
	ICertificateCourseFeeTableData,
	IDepartmentTableData,
	IFacultyTableData,
	IFinancialInfoTableData,
	IOfficeEntryTableData,
	IOfficeTableData,
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
		cell: (info) => <span className='capitalize'>{info?.getValue() as string}</span>,
	},
];

//* Program Columns
export const programColumns = (): ColumnDef<IProgramTableData>[] => [
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
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
		cell: (info) => {
			const category = authoritiesCategories.find((item) => item.value === info.getValue());
			return <span className='capitalize'>{category?.label ?? ''}</span>;
		},
	},
	{
		accessorKey: 'short_biography',
		header: 'Short Biography',
		enableColumnFilter: false,
	},
];
//* Certificate Course Fee Columns
export const certificateCourseFeeColumns = (): ColumnDef<ICertificateCourseFeeTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'program_name',
		header: 'Program',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'fee_per_course',
		header: 'Fee per Course',
		enableColumnFilter: false,
		cell: (info) => info.getValue() || 0,
	},
];
//* Tuition Fee Columns
export const tuitionFeeColumns = (): ColumnDef<ITuitionFeeTableData>[] => [
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
		accessorKey: 'program_name',
		header: 'Program',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'admission_fee',
		header: 'Admission Fee',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'tuition_fee_per_credit',
		header: 'Tuition Fee per Credit',
		enableColumnFilter: false,
		cell: (info) => info.getValue() || 0,
	},
	{
		accessorKey: 'student_activity_fee',
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
		enableColumnFilter: true,
		cell: (info) => {
			const category = botCategories.find((item) => item.value === info.getValue());
			return <span className='capitalize'>{category?.label ?? ''}</span>;
		},
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
			return <span className='capitalize'>{category?.label ?? ''}</span>;
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
];
//* Financial Information
export const financialInformationColumns = (): ColumnDef<IFinancialInfoTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'department_name',
		header: 'Department',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'total_credit',
		header: 'Total Credit',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'total_cost',
		header: 'Total Cost',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'admission_fee',
		header: 'Admission Fee',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'waiver_50',
		header: 'Waiver 50%',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'waiver_55',
		header: 'Waiver 55%',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'waiver_60',
		header: 'Waiver 60%',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'waiver_65',
		header: 'Waiver 65%',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'waiver_70',
		header: 'Waiver 70%',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'waiver_75',
		header: 'Waiver 75%',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'waiver_80',
		header: 'Waiver 80%',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'waiver_85',
		header: 'Waiver 85%',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'waiver_90',
		header: 'Waiver 90%',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'waiver_95',
		header: 'Waiver 95%',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'waiver_100',
		header: 'Waiver 100%',
		enableColumnFilter: true,
	},
];
