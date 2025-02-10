import useTQuery from '@/hooks/useTQuery';

import addUrlParams from '@/utils/routes/addUrlParams';

import { departmentQK, facultyQK, portfolioQK } from './queryKeys';

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
		url: '/portfolio/bot?is_admin=true',
	});

export const usePortfolioBotByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.botByUUID(uuid),
		url: `/portfolio/bot/${uuid}`,
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
		url: `/portfolio/office/${uuid}`,
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
