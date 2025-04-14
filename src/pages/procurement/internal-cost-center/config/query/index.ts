import useTQuery from '@/hooks/useTQuery';

import { internalCostCenterQK } from './queryKeys';

// * Internal Cost Center
export const useInternalCostCenter = <T>() =>
	useTQuery<T>({
		queryKey: internalCostCenterQK.internalCostCenter(),
		url: `/procure/internal-cost-center`,
	});

export const useInternalCostCenterByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: internalCostCenterQK.internalCostCenterByUUID(uuid),
		url: `/procure/internal-cost-center/${uuid}`,
		enabled: !!uuid,
	});
