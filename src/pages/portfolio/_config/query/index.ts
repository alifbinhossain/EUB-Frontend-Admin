import useTQuery from '@/hooks/useTQuery';

import { infoQK, jobCircularQK, portfolioQK, routineQK } from './queryKeys';

//* Programs
export const usePortfolioPrograms = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.programs(),
		url: '/portfolio/program',
	});

export const usePortfolioProgramByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.programByUUID(uuid),
		url: `/portfolio/program/${uuid}`,
		enabled: !!uuid,
	});

//* Authorities

export const usePortfolioAuthorities = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.authorities(),
		url: '/portfolio/authorities',
	});

export const usePortfolioAuthorityByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.authorityByUUID(uuid),
		url: `/portfolio/authorities/${uuid}`,
		enabled: !!uuid,
	});

//* Certificates Course Fees
export const usePortfolioCertificateCourseFees = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.certificateCourseFees(),
		url: '/portfolio/certificate-course-fee',
	});

export const usePortfolioCertificateCourseFeeByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.certificateCourseFeeByUUID(uuid),
		url: `/portfolio/certificate-course-fee/${uuid}`,
		enabled: !!uuid,
	});

//* Tuition Fees
export const usePortfolioTuitionFees = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.tuitionFees(),
		url: '/portfolio/tuition-fee',
	});

export const usePortfolioTuitionFeeByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.tuitionFeeByUUID(uuid),
		url: `/portfolio/tuition-fee/${uuid}`,
		enabled: !!uuid,
	});

// ? FACULTY
// * ALL Faculty
export const useFaculty = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.faculty(),
		url: `/portfolio/faculty`,
	});

// * Faculty By UUID
export const useFacultyByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.facultyByUUID(uuid),
		url: `/portfolio/faculty/${uuid}`,
		enabled: !!uuid,
	});

// ? INFO
// * ALL INFO
export const useInfo = <T>() =>
	useTQuery<T>({
		queryKey: infoQK.info(),
		url: `/portfolio/info`,
	});

// * INFO By UUID
export const useInfoByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: infoQK.infoByUUID(uuid),
		url: `/portfolio/info/${uuid}`,
		enabled: !!uuid,
	});

// ? ROUTINE
// * ALL ROUTINE
export const useRoutine = <T>() =>
	useTQuery<T>({
		queryKey: routineQK.routine(),
		url: `/portfolio/routine`,
	});

// * ROUTINE By UUID
export const useRoutineByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: routineQK.routineByUUID(uuid),
		url: `/portfolio/routine/${uuid}`,
		enabled: !!uuid,
	});

// ? JOB CIRCULAR
// * ALL JOB CIRCULAR
export const useJobCircular = <T>() =>
	useTQuery<T>({
		queryKey: jobCircularQK.jobCircular(),
		url: `/portfolio/job-circular`,
	});

// * JOB CIRCULAR By UUID
export const useJobCircularByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: jobCircularQK.jobCircularByUUID(uuid),
		url: `/portfolio/job-circular/${uuid}`,
		enabled: !!uuid,
	});

// ? DEPARTMENT
// * ALL Department
export const useDepartments = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.department(),
		url: `/portfolio/department`,
	});

// * Department By UUID
export const useDepartmentsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.departmentByUUID(uuid),
		url: `/portfolio/department/${uuid}`,
		enabled: !!uuid,
	});

// * Bot
export const usePortfolioBot = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.bot(),
		url: '/portfolio/bot?is_admin=true',
	});

export const usePortfolioBotByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.botByUUID(uuid),
		url: `/portfolio/bot/${uuid}`,
		enabled: !!uuid,
	});

// ? CLUB
// * ALL Club
export const useClubs = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.club(),
		url: '/portfolio/club',
	});

// * Club By UUID
export const useClubsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.clubByUUID(uuid),
		url: `/portfolio/club/${uuid}`,
		enabled: !!uuid,
	});

// ? DEPARTMENT-TEACHERS
// * ALL Department-Teachers
export const useDepartmentsTeachers = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.departmentTeachers(),
		url: `/portfolio/department-teachers`,
	});

// * Department-Teachers By UUID
export const useDepartmentsTeachersByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.departmentTeachersByUUID(uuid),
		url: `/portfolio/department-teachers/${uuid}`,
		enabled: !!uuid,
	});

// ? NEWS
// * ALL news
export const useNews = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.news(),
		url: `/portfolio/news?is_pagination=false`,
	});

// * News By UUID
export const useNewsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.newsByUUID(uuid),
		url: `/portfolio/news/${uuid}`,
		enabled: !!uuid,
	});

export const useNewsDetails = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.newsDetails(uuid),
		url: `portfolio/news-and-news-entry-details/by/news-uuid/${uuid}`,
		enabled: !!uuid,
	});

//* Office
export const usePortfolioOffice = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.office(),
		url: '/portfolio/office',
	});

export const usePortfolioOfficeByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.officeByUUID(uuid),
		url: `/portfolio/office-and-office-entry/details/by-office-uuid/${uuid}`,
		enabled: !!uuid,
	});
//* Financial Information
export const usePortfolioFinancialInformation = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.financialInformation(),
		url: '/portfolio/financial-info',
	});

export const usePortfolioFinancialInformationByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.financialInformationByUUID(uuid),
		url: `/portfolio/financial-info/${uuid}`,
		enabled: !!uuid,
	});
//* Admission
export const usePortfolioAdmission = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.admission(),
		url: '/portfolio/online-admission',
	});

export const usePortfolioAdmissionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.admissionByUUID(uuid),
		url: `/portfolio/online-admission/${uuid}`,
		enabled: !!uuid,
	});
