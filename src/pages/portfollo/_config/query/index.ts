import useTQuery from '@/hooks/useTQuery';

import { departmentQK, facultyQK, infoQK, jobCircularQK, portfolioQK, routineQK } from './queryKeys';

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
		queryKey: facultyQK.faculty(),
		url: `/portfolio/faculty`,
	});

// * Faculty By UUID
export const useFacultyByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: facultyQK.facultyByUUID(uuid),
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
		queryKey: departmentQK.department(),
		url: `/portfolio/department`,
	});

// * Department By UUID
export const useDepartmentsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: departmentQK.departmentByUUID(uuid),
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
