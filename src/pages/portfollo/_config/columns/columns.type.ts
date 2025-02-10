import { PORTFOLIO_PAGE_NAME, PORTFOLIO_PROGRAM_TYPE, PORTFOLIO_ROUTINE_TYPE } from '@/types/enum';

//* Authorities
export type IAuthoritiesTableData = {
	id: number;
	uuid: string;
	user_uuid: string;
	user_name: string;
	category:
		| 'chancellor'
		| 'chairman'
		| 'vc'
		| 'pro_vc'
		| 'dean'
		| 'treasurer'
		| 'director_coordination'
		| 'registrar';
	short_biography: string;
	remarks: string;
};
//* Certificate Course Fee
export type ICertificateCourseFeeTableData = {
	id: number;
	uuid: string;
	programs_uuid: string;
	programs_name: string;
	fee_per_course: number;
	remarks: string;
};
//* Tuition Fee
export type ITuitionFeeTableData = {
	id: number;
	uuid: string;
	title: string;
	program_uuid: string;
	admission_fee: number;
	tuition_fee_per_credit: number;
	student_activity_fee: number;
	library_fee_per_semester: number;
	computer_lab_fee_per_semester: number;
	science_lab_fee_per_semester: number;
	studio_lab_fee: number;
	remarks: string;
};
//* Program
export type IProgramTableData = {
	id: number;
	uuid: string;
	name: string;
	category: 'graduate' | 'undergraduate' | 'certificate';
	remarks: string;
};

//* Info
export type IInfoTableData = {
	id: number;
	uuid: string;
	department_uuid: string;
	department_name: string;
	description: string;
	page_name: PORTFOLIO_PAGE_NAME;
	file: string;
	is_global: boolean;
	remarks: string;
};

//* Routine
export type IRoutineTableData = {
	id: number;
	uuid: string;
	department_uuid: string;
	department_name: string;
	programs: PORTFOLIO_PROGRAM_TYPE;
	description: string;
	type: PORTFOLIO_ROUTINE_TYPE;
	file: string;
	remarks: string;
};

//* Job Circular
export type IJobCircularTableData = {
	id: number;
	uuid: string;
	title: string;
	faculty_uuid: string;
	faculty_name: string;
	category: string;
	location: string;
	file: string;
	deadline: Date;
	remarks: string;
};

// * Faculty
export type IFacultyTableData = {
	id: number;
	uuid: string;
	name: string;
};

// * Department
export type IDepartmentTableData = {
	id: number;
	uuid: string;
	name: string;
	faculty_uuid: string;
	category: string;
};

//* bot
export type IBotTableData = {
	id: number;
	uuid: string;
	category: 'syndicate' | 'academic_council';
	user_name: string;
	status: 'chairman' | 'member' | 'member_secretary';
	file?: string;
	description?: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
