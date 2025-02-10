import useTQuery from '@/hooks/useTQuery';

import addUrlParams from '@/utils/routes/addUrlParams';

import { portfolioQK } from './queryKeys';

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
		url: '/portfolio/bot',
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
