//* Certificate Course Fee
export type ICertificateCourseFeeTableData = {
	id: number;
	uuid: string;
	programs_uuid: string;
	program_name: string;
	fee_per_course: number;
	remarks: string;
};
//* Tuition Fee
export type ITuitionFeeTableData = {
	id: number;
	uuid: string;
	// title: string;
	program_uuid: string;
	program_name: string;
	admission_fee: number;
	tuition_fee_per_credit: number;
	student_activity_fee: number;
	library_fee_per_semester: number;
	computer_lab_fee_per_semester: number;
	science_lab_fee_per_semester: number;
	studio_lab_fee: number;
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
	year: number;
	is_admitted: boolean;
	student_id: string;
	commencement_date: string;
	uuid: string;
	semester: 'spring' | 'summer' | 'fall';
	program_uuid: string;
	program_name?: string;
	applicant_name: string;
	father_name: string;
	mother_name: string;
	local_guardian: string;
	nid_number: string;
	birth_certificate_number: string;
	date_of_birth: string;
	nationality: string;
	blood_group: 'A+' | 'O+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O-';
	phone_number: string;
	parents_phone: string;
	local_guardian_phone: string;
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
	ssc_registration_number: string;
	ssc_roll_number: string;
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
	hsc_registration_number: string;
	hsc_roll_number: string;
	bsc_name: string;
	bsc_cgpa: string;
	bsc_passing_year: number;
	bsc_institute: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
};
