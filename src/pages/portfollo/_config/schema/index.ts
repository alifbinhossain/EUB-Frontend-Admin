import { z } from 'zod';

import { PORTFOLIO_PAGE_NAME, PORTFOLIO_PROGRAM_TYPE, PORTFOLIO_ROUTINE_TYPE } from '@/types/enum';
import { BOOLEAN_REQUIRED, STRING_NULLABLE, STRING_OPTIONAL, STRING_REQUIRED } from '@/utils/validators';

//* Authorities Schema
export const AUTHORITIES_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	user_uuid: STRING_REQUIRED,
	category: z.enum([
		'chancellor',
		'chairman',
		'vc',
		'pro_vc',
		'dean',
		'treasurer',
		'director_coordination',
		'registrar',
	]),
	short_biography: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const AUTHORITIES_NULL: Partial<IAuthorities> = {
	uuid: '',
	user_uuid: '',
	category: undefined,
	short_biography: '',
	remarks: '',
};

export type IAuthorities = z.infer<typeof AUTHORITIES_SCHEMA>;

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
	title: STRING_REQUIRED,
	program_uuid: STRING_REQUIRED,
	admission_fee: z.number(),
	tuition_fee_per_credit: z.number().nullable(),
	student_activity_fee: z.number().nullable(),
	library_fee_per_semester: z.number().nullable(),
	computer_lab_fee_per_semester: z.number().nullable(),
	science_lab_fee_per_semester: z.number().nullable(),
	studio_lab_fee: z.number().default(0),
	remarks: STRING_NULLABLE,
});

export const TUITION_FEE_NULL: Partial<ITuitionFee> = {
	uuid: '',
	title: '',
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

//* Program Schema
export const PROGRAM_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	name: STRING_REQUIRED,
	category: z.enum(['graduate', 'undergraduate', 'certificate']),
	remarks: STRING_NULLABLE,
});
export const PROGRAM_NULL: Partial<IProgram> = {
	uuid: '',
	name: '',
	category: 'graduate',
	remarks: null,
};

export type IProgram = z.infer<typeof PROGRAM_SCHEMA>;

//* Faculty Schema
export const FACULTY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const FACULTY_NULL: Partial<IFaculty> = {
	name: '',
	remarks: null,
};

export type IFaculty = z.infer<typeof FACULTY_SCHEMA>;

//* Info Schema
export const INFO_SCHEMA = z.object({
	department_uuid: STRING_REQUIRED,
	description: STRING_REQUIRED,
	page_name: z.nativeEnum(PORTFOLIO_PAGE_NAME),
	file: z
		.instanceof(File)
		.refine((file) => file?.size !== 0, 'Please upload an file')
		.or(z.string()),
	is_global: BOOLEAN_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const INFO_NULL: Partial<IInfo> = {
	department_uuid: '',
	description: '',
	file: new File([''], 'filename') as File,
	is_global: false,
	remarks: null,
};

export type IInfo = z.infer<typeof INFO_SCHEMA>;

//* Routine Schema
export const ROUTINE_SCHEMA = z.object({
	department_uuid: STRING_REQUIRED,
	description: STRING_REQUIRED,
	programs: z.nativeEnum(PORTFOLIO_PROGRAM_TYPE),
	type: z.nativeEnum(PORTFOLIO_ROUTINE_TYPE),
	file: z
		.instanceof(File)
		.refine((file) => file?.size !== 0, 'Please upload an file')
		.or(z.string()),
	remarks: STRING_NULLABLE,
});

export const ROUTINE_NULL: Partial<IRoutine> = {
	department_uuid: '',
	description: '',
	file: new File([''], 'filename') as File,
	remarks: null,
};

export type IRoutine = z.infer<typeof ROUTINE_SCHEMA>;

//* Job Circular Schema
export const JOB_CIRCULAR_SCHEMA = z.object({
	title: STRING_REQUIRED,
	faculty_uuid: STRING_REQUIRED,
	category: STRING_REQUIRED,
	location: STRING_REQUIRED,
	deadline: STRING_REQUIRED,
	file: z
		.instanceof(File)
		.refine((file) => file?.size !== 0, 'Please upload an file')
		.or(z.string()),
	remarks: STRING_NULLABLE,
});

export const JOB_CIRCULAR_NULL: Partial<IJobCircular> = {
	title: '',
	category: '',
	faculty_uuid: '',
	deadline: '',
	location: '',
	file: new File([''], 'filename') as File,
	remarks: null,
};

export type IJobCircular = z.infer<typeof JOB_CIRCULAR_SCHEMA>;

//* Department Schema
export const PORTFOLIO_DEPARTMENT_SCHEMA = z.object({
	name: STRING_REQUIRED,
	faculty_uuid: STRING_REQUIRED,
	category: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const PORTFOLIO_DEPARTMENT_NULL: Partial<IPortfolioDepartment> = {
	name: '',
	faculty_uuid: '',
	category: '',
	remarks: null,
};

export type IPortfolioDepartment = z.infer<typeof PORTFOLIO_DEPARTMENT_SCHEMA>;

//* Bot Schema
export const BOT_SCHEMA = z.object({
	category: STRING_REQUIRED,
	user_uuid: STRING_REQUIRED,
	status: STRING_REQUIRED,
	description: STRING_REQUIRED,
	file: z.instanceof(File).refine((file) => file?.size !== 0, 'Please upload an file'),
	remarks: STRING_NULLABLE,
});

export const BOT_NULL: Partial<IBot> = {
	category: '',
	user_uuid: '',
	status: '',
	description: '',
	file: new File([''], 'filename') as File,
	remarks: null,
};

export type IBot = z.infer<typeof BOT_SCHEMA>;
