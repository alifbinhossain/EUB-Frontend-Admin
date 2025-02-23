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

// * Club
export type IClubTableData = {
	id: number;
	uuid: string;
	name: string;
	department_uuid: string;
	president_uuid: string;
	message: string;
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

// * News
export type INewsTableData = {
	id: number;
	uuid: string;
	title: string;
	subtitle: string;
	description: string;
	content: string;
	cover_image: string;
	published_date: string;
	department_uuid: string;
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

//* Financial Info
export type IFinancialInfoTableData = {
	id: number;
	uuid: string;
	department_uuid: string;
	department_name: string;
	table_name: string;
	category: string;
	total_credit: number;
	total_cost: number;
	admission_fee: number;
	waiver_50: number;
	waiver_55: number;
	waiver_60: number;
	waiver_65: number;
	waiver_70: number;
	waiver_75: number;
	waiver_80: number;
	waiver_85: number;
	waiver_90: number;
	waiver_95: number;
	waiver_100: number;
	remarks: string;
	created_at: string;
	updated_at: string;
};
//* Admission
export type IAdmissionTableData = {
	id: number;
	uuid: string;
	semester: 'spring' | 'summer' | 'fall';
	program_uuid: string;
	program_name?: string;
	applicant_name: string;
	father_name: string;
	mother_name: string;
	local_guardian: string;
	date_of_birth: string;
	nationality: string;
	blood_group: 'A+' | 'O+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O-';
	phone_number: string;
	bkash: string;
	email: string;
	gender: 'Male' | 'Female' | 'Other';
	marital_status: 'Single' | 'Married' | 'Divorced' | 'Widowed';
	present_address: string;
	village: string;
	post_office: string;
	thana: string;
	district: string;
	ssc_group: 'Science' | 'Business Group' | 'Humanities' | 'Vocational';
	ssc_grade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';
	ssc_gpa: string;
	ssc_board:
		| 'Dhaka'
		| 'Barisal'
		| 'Chittagong'
		| 'Dinajpur'
		| 'Khulna'
		| 'Rajshahi'
		| 'Sylhet'
		| 'Jessor'
		| 'Bangladesh Madrasa Board'
		| 'Bangladesh Technical Education Board';
	ssc_passing_year: number;
	ssc_institute: string;
	hsc_group: 'Science' | 'Business Group' | 'Humanities' | 'BM' | 'CSE' | 'EEE';
	hsc_grade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';
	hsc_gpa: string;
	hsc_board:
		| 'Dhaka'
		| 'Barisal'
		| 'Chittagong'
		| 'Dinajpur'
		| 'Khulna'
		| 'Rajshahi'
		| 'Sylhet'
		| 'Jessor'
		| 'Bangladesh Madrasa Board'
		| 'Bangladesh Technical Education Board';
	hsc_passing_year: number;
	hsc_institute: string;
	bsc_name: string;
	bsc_cgpa: string;
	bsc_passing_year: number;
	bsc_institute: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
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

//* Policy
export type IPolicyTableData = {
	id: number;
	uuid: string;
	name: string;
	department_uuid: string;
	published_date: string;
	file?: string;
	remarks: string;
};
