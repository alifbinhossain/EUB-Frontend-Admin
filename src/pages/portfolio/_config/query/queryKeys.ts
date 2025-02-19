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

	// * club
	club: () => [...portfolioQK.all(), 'club'],
	clubByUUID: (uuid: string) => [...portfolioQK.club(), uuid],
	// * offers
	offers: () => [...portfolioQK.all(), 'offers'],
	offersByUUID: (uuid: string) => [...portfolioQK.offers(), uuid],
	// * faculty
	faculty: () => [...portfolioQK.all(), 'faculty'],
	facultyByUUID: (uuid: string) => [...portfolioQK.faculty(), uuid],
	// * department
	department: () => [...portfolioQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...portfolioQK.department(), uuid],
	// * department-teacher
	departmentTeachers: () => [...portfolioQK.all(), 'department-teacher'],
	departmentTeachersByUUID: (uuid: string) => [...portfolioQK.departmentTeachers(), uuid],
	// * News
	news: () => [...portfolioQK.all(), 'news'],
	newsByUUID: (uuid: string) => [...portfolioQK.news(), uuid],
	newsDetails: (uuid: string) => [...portfolioQK.news(), 'details', uuid],
	//* admission
	admission: () => [...portfolioQK.all(), 'admission'],
	admissionByUUID: (uuid: string) => [...portfolioQK.admission(), uuid],
};

export const infoQK = {
	all: () => ['info'],
	info: () => [...infoQK.all(), 'info'],
	infoByUUID: (uuid: string) => [...infoQK.info(), uuid],
};

export const routineQK = {
	all: () => ['routine'],
	routine: () => [...routineQK.all(), 'routine'],
	routineByUUID: (uuid: string) => [...routineQK.routine(), uuid],
};

export const jobCircularQK = {
	all: () => ['job-circular'],
	jobCircular: () => [...jobCircularQK.all(), 'job-circular'],
	jobCircularByUUID: (uuid: string) => [...jobCircularQK.jobCircular(), uuid],
};
