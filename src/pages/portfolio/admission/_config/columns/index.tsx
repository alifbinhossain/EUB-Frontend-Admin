import { ColumnDef } from '@tanstack/react-table';

import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import {
	IAdmissionTableData,
	ICertificateCourseFeeTableData,
	IFinancialInfoTableData,
	ITuitionFeeTableData,
} from './columns.type';

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
	// {
	// 	accessorKey: 'title',
	// 	header: 'Title',
	// 	enableColumnFilter: true,
	// },
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
	// {
	// 	accessorKey: 'waiver_55',
	// 	header: 'Waiver 55%',
	// 	enableColumnFilter: true,
	// },
	{
		accessorKey: 'waiver_60',
		header: 'Waiver 60%',
		enableColumnFilter: true,
	},
	// {
	// 	accessorKey: 'waiver_65',
	// 	header: 'Waiver 65%',
	// 	enableColumnFilter: true,
	// },
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
	// {
	// 	accessorKey: 'waiver_85',
	// 	header: 'Waiver 85%',
	// 	enableColumnFilter: true,
	// },
	{
		accessorKey: 'waiver_90',
		header: 'Waiver 90%',
		enableColumnFilter: true,
	},
	// {
	// 	accessorKey: 'waiver_95',
	// 	header: 'Waiver 95%',
	// 	enableColumnFilter: true,
	// },
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
	},
	{
		accessorKey: 'applicant_name',
		header: 'Applicant Name',
		enableColumnFilter: true,
		cell: (info) => {
			const uuid = info.row.original.uuid;
			return <LinkOnly uri={`/admission/online-form/${uuid}/details`} title={info.getValue() as string} />;
		},
	},

	{ accessorKey: 'semester', header: 'Semester', enableColumnFilter: true },
	{ accessorKey: 'program_name', header: 'Program Name', enableColumnFilter: true }, // Display program name

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
