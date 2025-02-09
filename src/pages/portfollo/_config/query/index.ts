import useTQuery from '@/hooks/useTQuery';

import { portfolioQK } from './queryKeys';

// * Designation
export const useHrDesignations = <T>() =>
	useTQuery<T>({
		queryKey: portfolioQK.designation(),
		url: '/hr/designation',
	});

export const useHrDesignationByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: portfolioQK.designationByUUID(uuid),
		url: `/hr/designation/${uuid}`,
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
