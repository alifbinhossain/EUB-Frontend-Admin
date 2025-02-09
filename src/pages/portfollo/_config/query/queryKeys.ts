import { IParams } from '@/types';

export const portfolioQK = {
	all: () => ['admin'],
	//* program
	programs: () => [...portfolioQK.all(), 'programs'],
	programByUUID: (uuid: string) => [...portfolioQK.programs(), uuid],
	//* authorities
	authorities: () => [...portfolioQK.all(), 'authorities'],
	authorityByUUID: (uuid: string) => [...portfolioQK.authorities(), uuid],
	// * certificate_course_fee
	certificateCourseFees: () => [...portfolioQK.all(), 'certificate_course_fee'],
	certificateCourseFeeByUUID: (uuid: string) => [...portfolioQK.certificateCourseFees(), uuid],

	// * tuition_fees
	tuitionFees: () => [...portfolioQK.all(), 'tuition_fee'],
	tuitionFeeByUUID: (uuid: string) => [...portfolioQK.tuitionFees(), uuid],
};

export const facultyQK = {
	all: () => ['faculty'],
	faculty: () => [...facultyQK.all(), 'faculty'],
	facultyByUUID: (uuid: string) => [...facultyQK.faculty(), uuid],
};

export const departmentQK = {
	all: () => ['department'],
	department: () => [...departmentQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...departmentQK.department(), uuid],
};
