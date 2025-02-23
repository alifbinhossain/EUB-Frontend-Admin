import useTQuery from '@/hooks/useTQuery';

import { jobCircularQK, portfolioQK } from './queryKeys';

// ? JOB CIRCULAR
// * ALL JOB CIRCULAR
export const useJobCircular = <T>() =>
	useTQuery<T>({
		queryKey: jobCircularQK.jobCircular(),
		url: `/portfolio/job-circular?is_pagination=false`,
	});

// * JOB CIRCULAR By UUID
export const useJobCircularByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: jobCircularQK.jobCircularByUUID(uuid),
		url: `/portfolio/job-circular/${uuid}`,
		enabled: !!uuid,
	});

// ? CLUB
// * ALL Club
export const useClubs = <T>(query: string = '') =>
	useTQuery<T>({
		queryKey: portfolioQK.club(query),
		url: query ? `/portfolio/club?access=${query}` : '/portfolio/club',
	});

// * Club By UUID
export const useClubsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.clubByUUID(uuid),
		url: `/portfolio/club/${uuid}`,
		enabled: !!uuid,
	});

// ? NEWS
// * ALL news
export const useNews = <T>(query: string = '') =>
	useTQuery<T>({
		queryKey: portfolioQK.news(query),
		url: query ? `/portfolio/news?is_pagination=false&access=${query}` : `/portfolio/news?is_pagination=false`,
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

//* Policy
export const usePortfolioPolicy = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.policy(),
		url: '/portfolio/policy?is_pagination=false',
	});

export const usePortfolioPolicyByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.policyByUUID(uuid),
		url: `/portfolio/policy/${uuid}`,
		enabled: !!uuid,
	});
//* Tender
export const usePortfolioTender = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.tender(),
		url: '/portfolio/tender?is_pagination=false',
	});

export const usePortfolioTenderByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.tenderByUUID(uuid),
		url: `/portfolio/tender/${uuid}`,
		enabled: !!uuid,
	});
