import useTQuery from '@/hooks/useTQuery';

import { purchaseCostCenterQK } from './queryKeys';

// * SUBCATEGORY
export const usePurchaseCostCenter = <T>() =>
	useTQuery<T>({
		queryKey: purchaseCostCenterQK.purchase(),
		url: `/procure/purchase-cost-center`,
	});

export const usePurchaseCostCenterByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: purchaseCostCenterQK.purchaseByUUID(uuid),
		url: `/procure/purchase-cost-center/${uuid}`,
		enabled: !!uuid,
	});
