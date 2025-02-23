import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import { RichTextModal } from '@/components/core/modal';
import FilePreview from '@/components/others/file-preview';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import { API_IMAGE_URL } from '@/lib/secret';

import { categories as authoritiesCategories } from '../../authorities/utils';
import { categories as botCategories, status as botStatus } from '../../bot/utils';
import { categories as officeCategories } from '../../office/utills';
import { tableNames } from '../../useful-links/tender/utills';
import {
	IAdmissionTableData,
	IAuthoritiesTableData,
	IBotTableData,
	ICertificateCourseFeeTableData,
	IClubTableData,
	IDepartmentTableData,
	IDepartmentTeachersTableData,
	IFacultyTableData,
	IFinancialInfoTableData,
	IInfoTableData,
	IJobCircularTableData,
	INewsTableData,
	IOffersTableData,
	IOfficeEntryTableData,
	IOfficeTableData,
	IPolicyTableData,
	IRoutineTableData,
	ITenderTableData,
	ITuitionFeeTableData,
} from './columns.type';

// * Department
export const departmentColumns = (): ColumnDef<IDepartmentTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
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
		accessorKey: 'department_name',
		header: 'Department Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'page_name',
		header: 'Page Name',
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
		accessorKey: 'file',
		header: 'File',
		enableColumnFilter: true,
		cell: (info) => <FilePreview preview={info.getValue() as string} />,
	},
];

// * Job Circular Columns
export const jobCircularColumns = (): ColumnDef<IJobCircularTableData>[] => [
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

// * Department-Teachers Columns
export const departmentTeachersColumns = (): ColumnDef<IDepartmentTeachersTableData>[] => [
	{
		accessorKey: 'department_name',
		header: 'Department',
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
//* Financial Information
export const financialInformationColumns = (): ColumnDef<IFinancialInfoTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
	},

	{
		accessorKey: 'table_name',
		header: 'Group',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'department_name',
		header: 'Department',
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

//*Admission
export const admissionColumns = (): ColumnDef<IAdmissionTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
		cell: (info) => {
			const uuid = info.row.original.uuid;
			return <LinkOnly uri={`/portfolio/admission/${uuid}/details`} title={info.getValue() as string} />;
		},
	},

	{ accessorKey: 'semester', header: 'Semester', enableColumnFilter: true },
	{ accessorKey: 'program_name', header: 'Program Name', enableColumnFilter: true }, // Display program name
	{ accessorKey: 'applicant_name', header: 'Applicant Name', enableColumnFilter: true },
	{ accessorKey: 'father_name', header: 'Father Name', enableColumnFilter: true },
	{ accessorKey: 'mother_name', header: 'Mother Name', enableColumnFilter: true },
	{ accessorKey: 'local_guardian', header: 'Local Guardian', enableColumnFilter: true },
	{
		accessorKey: 'date_of_birth',
		header: 'Date of Birth',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{ accessorKey: 'nationality', header: 'Nationality', enableColumnFilter: true },
	{ accessorKey: 'blood_group', header: 'Blood Group', enableColumnFilter: true },
	{ accessorKey: 'phone_number', header: 'Phone Number', enableColumnFilter: true },
	{ accessorKey: 'email', header: 'Email', enableColumnFilter: true },
	{ accessorKey: 'gender', header: 'Gender', enableColumnFilter: true },
	{ accessorKey: 'marital_status', header: 'Marital Status', enableColumnFilter: true },
	{ accessorKey: 'present_address', header: 'Present Address', enableColumnFilter: true },
	{ accessorKey: 'village', header: 'Village', enableColumnFilter: true },
	{ accessorKey: 'post_office', header: 'Post Office', enableColumnFilter: true },
	{ accessorKey: 'thana', header: 'Thana', enableColumnFilter: true },
	{ accessorKey: 'district', header: 'District', enableColumnFilter: true },
	{ accessorKey: 'ssc_group', header: 'SSC Group', enableColumnFilter: true },
	{ accessorKey: 'ssc_grade', header: 'SSC Grade', enableColumnFilter: true },
	{ accessorKey: 'ssc_gpa', header: 'SSC GPA', enableColumnFilter: true },
	{ accessorKey: 'ssc_board', header: 'SSC Board', enableColumnFilter: true },
	{ accessorKey: 'ssc_passing_year', header: 'SSC Passing Year', enableColumnFilter: true },
	{ accessorKey: 'ssc_institute', header: 'SSC Institute', enableColumnFilter: true },
	{ accessorKey: 'hsc_group', header: 'HSC Group', enableColumnFilter: true },
	{ accessorKey: 'hsc_grade', header: 'HSC Grade', enableColumnFilter: true },
	{ accessorKey: 'hsc_gpa', header: 'HSC GPA', enableColumnFilter: true },
	{ accessorKey: 'hsc_board', header: 'HSC Board', enableColumnFilter: true },
	{ accessorKey: 'hsc_passing_year', header: 'HSC Passing Year', enableColumnFilter: true },
	{ accessorKey: 'hsc_institute', header: 'HSC Institute', enableColumnFilter: true },
	{ accessorKey: 'bsc_name', header: 'BSc Name', enableColumnFilter: true },
	{ accessorKey: 'bsc_cgpa', header: 'BSc CGPA', enableColumnFilter: true },
	{ accessorKey: 'bsc_passing_year', header: 'BSc Passing Year', enableColumnFilter: true },
	{ accessorKey: 'bsc_institute', header: 'BSc Institute', enableColumnFilter: true },
];

// * Club Columns
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
