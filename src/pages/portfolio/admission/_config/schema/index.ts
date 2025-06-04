import { z } from 'zod';

import { FINANCIAL_INFO_TABLE_TYPE } from '@/types/enum';
import {
	BOOLEAN_OPTIONAL,
	BOOLEAN_REQUIRED,
	EMAIL_REQUIRED,
	NUMBER_REQUIRED,
	PHONE_NUMBER,
	PHONE_NUMBER_NULLABLE,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Certificate Course Fee Schema
export const CERTIFICATE_COURSE_FEE_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	programs_uuid: STRING_REQUIRED,
	fee_per_course: z.number().default(0),
	remarks: STRING_NULLABLE,
});

export const CERTIFICATE_COURSE_FEE_NULL: Partial<ICertificateCourseFee> = {
	uuid: '',
	programs_uuid: '',
	fee_per_course: 0,
	remarks: '',
};

export type ICertificateCourseFee = z.infer<typeof CERTIFICATE_COURSE_FEE_SCHEMA>;

export const TUITION_FEE_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	program_uuid: STRING_REQUIRED,
	admission_fee: z.number().min(1, { message: 'Value must be greater than 0' }),
	tuition_fee_per_credit: z.number().min(1, { message: 'Value must be greater than 0' }),
	student_activity_fee: z.number().min(1, { message: 'Value must be greater than 0' }),
	library_fee_per_semester: z.number().min(1, { message: 'Value must be greater than 0' }),
	computer_lab_fee_per_semester: z.number().min(1, { message: 'Value must be greater than 0' }),
	science_lab_fee_per_semester: z.number().min(1, { message: 'Value must be greater than 0' }),
	studio_lab_fee: z.number().min(1, { message: 'Value must be greater than 0' }),
	remarks: STRING_NULLABLE,
});

export const TUITION_FEE_NULL: Partial<ITuitionFee> = {
	uuid: '',
	program_uuid: '',
	admission_fee: 0,
	tuition_fee_per_credit: 0,
	student_activity_fee: 0,
	library_fee_per_semester: 0,
	computer_lab_fee_per_semester: 0,
	science_lab_fee_per_semester: 0,
	studio_lab_fee: 0,
	remarks: '',
};

export type ITuitionFee = z.infer<typeof TUITION_FEE_SCHEMA>;

// * Department-Teacher Schema
export const PORTFOLIO_DEPARTMENT_TEACHER_SCHEMA = z.object({
	department_uuid: STRING_REQUIRED,
	department_head: BOOLEAN_REQUIRED,
	teacher_email: STRING_REQUIRED,
	teacher_phone: PHONE_NUMBER_NULLABLE,
	teacher_designation: STRING_REQUIRED,
	teacher_uuid: STRING_REQUIRED,
	education: STRING_REQUIRED,
	publication: STRING_REQUIRED,
	journal: STRING_REQUIRED,
	about: STRING_REQUIRED,
	appointment_date: STRING_REQUIRED,
	resign_date: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const PORTFOLIO_DEPARTMENT_TEACHER_NULL: Partial<IDepartmentTeachers> = {
	department_uuid: '',
	department_head: false,
	teacher_email: '',
	teacher_phone: null,
	teacher_designation: '',
	teacher_uuid: '',
	education: '',
	publication: '',
	journal: '',
	about: '',
	appointment_date: '',
	resign_date: null,
	remarks: null,
};

export type IDepartmentTeachers = z.infer<typeof PORTFOLIO_DEPARTMENT_TEACHER_SCHEMA>;

//* Financial Schema
export const FINANCIAL_INFORMATION_SCHEMA = z.object({
	department_uuid: STRING_REQUIRED,
	table_name: z.nativeEnum(FINANCIAL_INFO_TABLE_TYPE),
	total_credit: z.number().nullable(),
	total_cost: z.number().nullable(),
	total_waiver_amount: z.number().nullable(),
	waiver_50: z.number().nullable(),
	waiver_55: z.number().nullable(),
	waiver_60: z.number().nullable(),
	waiver_65: z.number().nullable(),
	waiver_70: z.number().nullable(),
	waiver_75: z.number().nullable(),
	waiver_80: z.number().nullable(),
	waiver_85: z.number().nullable(),
	waiver_90: z.number().nullable(),
	waiver_95: z.number().nullable(),
	waiver_100: z.number().nullable(),
	remarks: STRING_NULLABLE,
});

export const FINANCIAL_INFORMATION_NULL: Partial<IPortfolioFinancialInformation> = {
	department_uuid: '',
	total_credit: 0,
	total_cost: 0,
	total_waiver_amount: 0,
	// admission_fee: 0,
	waiver_50: 0,
	waiver_55: 0,
	waiver_60: 0,
	waiver_65: 0,
	waiver_70: 0,
	waiver_75: 0,
	waiver_80: 0,
	waiver_85: 0,
	waiver_90: 0,
	waiver_95: 0,
	waiver_100: 0,
	remarks: null,
};

export type IPortfolioFinancialInformation = z.infer<typeof FINANCIAL_INFORMATION_SCHEMA>;

//* Admission
export const PORTFOLIO_ADMISSION_SCHEMA = z
	.object({
		year: NUMBER_REQUIRED,
		semester: STRING_OPTIONAL,
		is_admitted: BOOLEAN_REQUIRED,
		commencement_date: STRING_NULLABLE,
		student_id: STRING_OPTIONAL,
		program_uuid: STRING_REQUIRED.min(1, { message: 'Program is required' }),
		applicant_name: STRING_REQUIRED.min(1, { message: 'Applicant name is required' }),
		father_name: STRING_REQUIRED.min(1, { message: 'Fathers name is required' }),
		mother_name: STRING_REQUIRED.min(1, { message: 'Mothers name is required' }),
		local_guardian: STRING_REQUIRED.min(1, { message: 'Local guardian is required' }),
		gender: z.enum(['Male', 'Female', 'Other'], { message: 'Select any gender' }),
		marital_status: z.enum(['Single', 'Married', 'Widowed', 'Divorced'], { message: 'Select any marital status' }),
		date_of_birth: STRING_REQUIRED.min(1, { message: 'Date of birth is required' }),
		present_address: STRING_REQUIRED,
		village: STRING_REQUIRED.min(1, { message: 'Village is required' }),
		post_office: STRING_REQUIRED.min(1, { message: 'Post office is required' }),
		thana: STRING_REQUIRED.min(1, { message: 'Thana is required' }),
		district: STRING_REQUIRED.min(1, { message: 'District is required' }),
		nationality: STRING_REQUIRED.min(1, { message: 'Nationality is required' }),
		phone_number: PHONE_NUMBER_NULLABLE,
		email: EMAIL_REQUIRED.min(1, { message: 'Email is required' }),
		bkash: PHONE_NUMBER.min(1, { message: 'Bkash number is required' }),
		parents_phone: PHONE_NUMBER_NULLABLE,
		local_guardian_phone: PHONE_NUMBER_NULLABLE,
		blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], { message: 'Select any blood group' }),

		birth_certificate_number: STRING_OPTIONAL,
		nid_number: STRING_OPTIONAL,

		ssc_group: z.enum(['Science', 'Business Group', 'Humanities', 'Vocational'], { message: 'Select Group' }),
		ssc_grade: z.enum(['Golden A+', 'A+', 'A', 'A-', 'B+', 'B', 'B+', 'B-', 'C+', 'C', 'C-', 'D', 'F'], {
			message: 'Grade is required',
		}),
		ssc_gpa: z.number().min(0.01, { message: 'GPA must be greater than zero' }).nullable(),
		ssc_board: z.enum([
			'Dhaka',
			'Chittagong',
			'Jessore',
			'Dinajpur',
			'Khulna',
			'Sylhet',
			'Rajshahi',
			'Bangladesh Madrasa Board',
			'Bangladesh Technical Education Board',
		]),
		ssc_passing_year: z.number().min(4, { message: 'Passing year is required' }),
		ssc_institute: STRING_REQUIRED.min(1, { message: 'Institution is required' }),
		ssc_roll_number: STRING_REQUIRED.regex(/^\d+$/, { message: 'SSC roll number must be numeric' }),
		ssc_registration_number: STRING_REQUIRED.regex(/^\d+$/, {
			message: 'SSC registration number must be numeric',
		}),

		hsc_group: z.enum(['Science', 'Business Group', 'Humanities', 'BM', 'CSE', 'EEE', 'Civil'], {
			message: 'Select Group',
		}),
		hsc_grade: z.enum(['Golden A+', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'], {
			message: 'Grade is required',
		}),
		hsc_gpa: z.number().min(0.01, { message: 'GPA must be greater than zero' }).nullable(),
		hsc_board: z.enum([
			'Dhaka',
			'Chittagong',
			'Jessore',
			'Dinajpur',
			'Khulna',
			'Sylhet',
			'Rajshahi',
			'Bangladesh Madrasa Board',
			'Bangladesh Technical Education Board',
		]),
		hsc_passing_year: z.number().min(4, { message: 'Passing year is required' }),
		hsc_institute: STRING_REQUIRED.min(1, { message: 'Institution is required' }),
		hsc_roll_number: STRING_REQUIRED.regex(/^\d+$/, { message: 'HSC roll number must be numeric' }),
		hsc_registration_number: STRING_REQUIRED.regex(/^\d+$/, {
			message: 'HSC registration number must be numeric',
		}),

		bsc_name: STRING_NULLABLE,
		bsc_cgpa: z.number().nullable(),
		bsc_passing_year: z.number().nullable(),
		bsc_institute: STRING_NULLABLE,
	})
	.superRefine((data, ctx) => {
		// if (!data.spring && !data.summer && !data.fall) {
		// 	ctx.addIssue({
		// 		code: z.ZodIssueCode.custom,
		// 		message: 'Select at least one program',
		// 		path: ['spring'],
		// 	});
		// }
		if (
			data.bsc_name ||
			(data.bsc_cgpa && data?.bsc_cgpa > 0) ||
			(data.bsc_passing_year && data?.bsc_passing_year > 0) ||
			data.bsc_institute
		) {
			if (!data?.bsc_name) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please fill bsc name',
					path: ['bsc_name'],
				});
			}
			if (!data?.bsc_cgpa || data?.bsc_cgpa < 1) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please fill bsc cgpa',
					path: ['bsc_cgpa'],
				});
			}
			if (!data?.bsc_passing_year) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please fill bsc passing year',
					path: ['bsc_passing_year'],
				});
			}
			if (!data?.bsc_institute) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please fill bsc institute',
					path: ['bsc_institute'],
				});
			}
			if (data?.bsc_passing_year !== null && data?.bsc_passing_year < data?.hsc_passing_year) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Passing year of bsc must be greater than hsc',
					path: ['bsc_passing_year'],
				});
			}
			if (data?.bsc_passing_year !== null && data?.bsc_passing_year < data?.ssc_passing_year) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Passing year of bsc must be greater than ssc',
					path: ['bsc_passing_year'],
				});
			}
		}
		if (data?.hsc_passing_year < data?.ssc_passing_year) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passing year of hsc must be greater than ssc',
				path: ['hsc_passing_year'],
			});
		}
		if (data?.is_admitted && !data?.student_id) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Student ID is required',
				path: ['student_id'],
			});
		}
		if (data?.student_id && data?.student_id.length !== 10) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Student ID must be 10 digits',
				path: ['student_id'],
			});
		}
		if (!data?.nid_number && !data?.birth_certificate_number) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'NID number or Birth certificate number is required',
				path: ['nid_number', 'birth_certificate_number'],
			});
		}
	});

export const PORTFOLIO_ADMISSION_NULL: Partial<IAdmissionForm> = {
	semester: '',
	is_admitted: false,
	// spring: false,
	// summer: false,
	// fall: false,

	program_uuid: '',
	applicant_name: '',
	commencement_date: null,

	father_name: '',
	mother_name: '',
	local_guardian: '',
	gender: undefined,
	marital_status: undefined,
	date_of_birth: '',
	phone_number: null,
	email: '',
	bkash: '',
	blood_group: undefined,
	nationality: '',

	present_address: '',
	village: '',
	post_office: '',
	thana: '',
	district: '',

	ssc_group: undefined,
	ssc_grade: undefined,
	ssc_gpa: 0.0,
	ssc_board: undefined,
	ssc_passing_year: 0,
	ssc_institute: '',

	hsc_group: undefined,
	hsc_grade: undefined,
	hsc_gpa: 0.0,
	hsc_board: undefined,
	hsc_passing_year: 0,
	hsc_institute: '',

	bsc_name: null,
	bsc_cgpa: 0,
	bsc_passing_year: 0,
	bsc_institute: null,
};
export type IAdmissionForm = z.infer<typeof PORTFOLIO_ADMISSION_SCHEMA>;
