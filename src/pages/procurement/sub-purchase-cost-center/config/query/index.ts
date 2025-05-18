import useTQuery from '@/hooks/useTQuery';

import { purchaseCostCenterQK } from './queryKeys';

// * SUBCATEGORY
export const useSubPurchaseCostCenter = <T>() =>
	useTQuery<T>({
		queryKey: purchaseCostCenterQK.subPurchase(),
		url: `/procure/sub-purchase-cost-center`,
	});

export const useSubPurchaseCostCenterByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: purchaseCostCenterQK.subPurchaseByUUID(uuid),
		url: `/procure/sub-purchase-cost-center/${uuid}`,
		enabled: !!uuid,
	});
