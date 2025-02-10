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
	//* office
	office: () => [...portfolioQK.all(), 'office'],
	officeByUUID: (uuid: string) => [...portfolioQK.office(), uuid],

	//* financial_information
	financialInformation: () => [...portfolioQK.all(), 'financial_information'],
	financialInformationByUUID: (uuid: string) => [...portfolioQK.financialInformation(), uuid],
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
