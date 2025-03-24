import { z } from 'zod';

import { PORTFOLIO_PAGE_NAME, PORTFOLIO_PROGRAM_TYPE, PORTFOLIO_ROUTINE_TYPE } from '@/types/enum';
import {
	BOOLEAN_OPTIONAL,
	BOOLEAN_REQUIRED,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

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
	phone: STRING_REQUIRED,
	email: STRING_REQUIRED,
	short_biography: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const AUTHORITIES_NULL: Partial<IAuthorities> = {
	uuid: '',
	user_uuid: '',
	category: undefined,
	phone: '',
	email: '',
	short_biography: '',
	remarks: '',
};

export type IAuthorities = z.infer<typeof AUTHORITIES_SCHEMA>;

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
	description: STRING_REQUIRED,
	page_name: z.nativeEnum(PORTFOLIO_PAGE_NAME),

	file: z
		.instanceof(File)
		.refine((file) => file?.size !== 0, 'Please upload an file')
		.or(STRING_REQUIRED),
	remarks: STRING_NULLABLE,
});

export const INFO_NULL: Partial<IInfo> = {
	description: '',
	file: new File([''], 'filename') as File,
	remarks: null,
};

export type IInfo = z.infer<typeof INFO_SCHEMA>;

//* Routine Schema
export const ROUTINE_SCHEMA = z.object({
	department_uuid: STRING_REQUIRED,
	description: STRING_REQUIRED,
	programs: z.nativeEnum(PORTFOLIO_PROGRAM_TYPE),
	type: z.nativeEnum(PORTFOLIO_ROUTINE_TYPE),
	is_global: BOOLEAN_OPTIONAL,
	file: z
		.instanceof(File)
		.refine((file) => file?.size !== 0, 'Please upload an file')
		.or(STRING_REQUIRED),
	remarks: STRING_NULLABLE,
});

export const ROUTINE_NULL: Partial<IRoutine> = {
	department_uuid: '',
	description: '',
	is_global: false,
	file: new File([''], 'filename') as File,
	remarks: null,
};

export type IRoutine = z.infer<typeof ROUTINE_SCHEMA>;

//* Department Schema
export const PORTFOLIO_DEPARTMENT_SCHEMA = z.object({
	name: STRING_REQUIRED,
	page_link: STRING_REQUIRED,
	short_name: STRING_REQUIRED,
	faculty_uuid: STRING_REQUIRED,
	category: STRING_REQUIRED,
	remarks: STRING_OPTIONAL,
});

export const PORTFOLIO_DEPARTMENT_NULL: Partial<IPortfolioDepartment> = {
	name: '',
	short_name: '',
	page_link: '',
	faculty_uuid: '',
	category: '',
	remarks: '',
};

export type IPortfolioDepartment = z.infer<typeof PORTFOLIO_DEPARTMENT_SCHEMA>;

//* Bot Schema
export const BOT_SCHEMA = z.object({
	category: z.enum(['syndicate', 'academic_council']),
	user_uuid: STRING_REQUIRED,
	user_designation: STRING_REQUIRED,
	status: z.enum(['chairman', 'member', 'member_secretary']),
	description: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const BOT_NULL: Partial<IBot> = {
	category: 'academic_council',
	user_uuid: '',
	user_designation: '',
	status: 'member',
	description: '',
	remarks: null,
};

export type IBot = z.infer<typeof BOT_SCHEMA>;

// * Department-Teacher Schema
export const PORTFOLIO_DEPARTMENT_TEACHER_SCHEMA = z.object({
	department_uuid: STRING_REQUIRED,
	department_head: BOOLEAN_REQUIRED,
	teacher_email: STRING_REQUIRED,
	teacher_phone: STRING_NULLABLE,
	teacher_designation: STRING_REQUIRED,
	teacher_uuid: STRING_REQUIRED,
	education: STRING_REQUIRED,
	publication: STRING_REQUIRED,
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

// * Offers Schema
export const OFFERS_SCHEMA = z.object({
	serial: NUMBER_REQUIRED,
	title: STRING_REQUIRED,
	file: z
		.instanceof(File)
		.refine((file) => file?.size !== 0, 'Please upload an file')
		.or(STRING_REQUIRED),
	subtitle: STRING_REQUIRED,
	deadline: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const OFFERS_NULL: Partial<IOffers> = {
	serial: 0,
	title: '',
	file: new File([''], 'filename') as File,
	subtitle: '',
	deadline: '',
	remarks: null,
};

export type IOffers = z.infer<typeof OFFERS_SCHEMA>;
//* Office Schema

export const OFFICE_SCHEMA = z.object({
	index: NUMBER_REQUIRED,
	uuid: STRING_OPTIONAL,
	title: STRING_REQUIRED,
	category: z.enum([
		'registrar',
		'controller_of_examinations',
		'ict_division',
		'ciac',
		'program_coordination',
		'admission_and_student_affairs',
		'finance_and_accounts',
		'faculty_development_and_evaluation',
		'planning_and_development',
		'proctor',
		'procurement_and_inventory',
		'iqac',
		'library',
	]),
	image: z.any().refine((file) => file !== null && file !== undefined, 'Image is required'),
	remarks: STRING_NULLABLE,
	office_entries: z
		.array(
			z.object({
				uuid: STRING_OPTIONAL,
				office_uuid: STRING_OPTIONAL,
				user_uuid: STRING_REQUIRED,
				user_email: STRING_REQUIRED,
				user_phone: STRING_NULLABLE,
				designation: STRING_REQUIRED,
				remarks: STRING_NULLABLE,
			})
		)
		.optional(),
});

export const OFFICE_NULL: Partial<IOffice> = {
	uuid: '',
	title: '',
	category: undefined,
	remarks: '',
	office_entries: [],
};

export type IOffice = z.infer<typeof OFFICE_SCHEMA>;
