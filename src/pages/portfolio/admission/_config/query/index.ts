import useTQuery from '@/hooks/useTQuery';

import { portfolioQK } from './queryKeys';

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
