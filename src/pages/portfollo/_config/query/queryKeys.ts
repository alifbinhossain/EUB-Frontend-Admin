export const portfolioQK = {
	all: () => ['portfolio'],
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

	//* bot
	bot: () => [...portfolioQK.all(), 'bot'],
	botByUUID: (uuid: string) => [...portfolioQK.bot(), uuid],

	// * club
	club: () => [...portfolioQK.all(), 'club'],
	clubByUUID: (uuid: string) => [...portfolioQK.club(), uuid],
	// * faculty
	faculty: () => [...portfolioQK.all(), 'faculty'],
	facultyByUUID: (uuid: string) => [...portfolioQK.faculty(), uuid],
	// * department
	department: () => [...portfolioQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...portfolioQK.department(), uuid],
	// * department-teacher
	departmentTeachers: () => [...portfolioQK.all(), 'department-teacher'],
	departmentTeachersByUUID: (uuid: string) => [...portfolioQK.departmentTeachers(), uuid],
};
