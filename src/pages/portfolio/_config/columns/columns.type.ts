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
	description: string;
	page_name: PORTFOLIO_PAGE_NAME;
	file: string;
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
	is_global: boolean;
	file: string;
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
	short_name: string;
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

// * Department-Teachers
export type IDepartmentTeachersTableData = {
	id: number;
	uuid: string;
	department_uuid: string;
	teacher_uuid: string;
	teacher_name: string;
	teacher_image: string;
	department_head: boolean;
	education: string;
	publication: string;
	journal: string;
};

//* office
export type IOfficeEntryTableData = {
	id: number;
	office_uuid: string;
	user_uuid: string;
	remark: string;
};
export type IOfficeTableData = {
	id: number;
	uuid: string;
	title: string;
	image: any;
	category:
		| 'registrar'
		| 'controller_of_examinations'
		| 'ict_division'
		| 'ciac'
		| 'program_coordination'
		| 'admission_and_student_affairs'
		| 'finance_and_accounts'
		| 'faculty_development_and_evaluation'
		| 'planning_and_development'
		| 'proctor'
		| 'procurement_and_inventory'
		| 'iqac'
		| 'library';
	office_entries: IOfficeEntryTableData[];
	created_by_name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};

// * offers
export type IOffersTableData = {
	id: number;
	uuid: string;
	serial: number;
	title: string;
	subtitle: string;
	deadline: string;
	remarks: string;
};
