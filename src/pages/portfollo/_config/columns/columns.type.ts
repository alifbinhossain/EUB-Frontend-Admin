//* Authorities
export type IAuthoritiesTableData = {
	id: number;
	uuid: string;
	user_uuid: string;
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
};
//* Certificate Course Fee
export type ICertificateCourseFeeTableData = {
	id: number;
	uuid: string;
	programs_uuid: string;
	fee_per_course: number;
};
//* Tuition Fee
export type ITuitionFeeTableData = {
	id: number;
	uuid: string;
	title: string;
	program_uuid: string;
	admission_fee: number;
	tuition_fee_per_credit?: number;
	student_activity_fee_per_semester?: number;
	library_fee_per_semester?: number;
	computer_lab_fee_per_semester?: number;
	science_lab_fee_per_semester?: number;
	studio_lab_fee?: number;
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
