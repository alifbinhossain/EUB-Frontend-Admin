import useTQuery from '@/hooks/useTQuery';

import { purchaseCostCenter } from './queryKeys';

// * SUBCATEGORY
export const usePurchaseCostCenter = <T>() =>
	useTQuery<T>({
		queryKey: purchaseCostCenter.purchase(),
		url: `/procure/purchase-cost-center`,
	});

export const usePurchaseCostCenterByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: purchaseCostCenter.purchaseByUUID(uuid),
		url: `/procure/purchase-cost-center/${uuid}`,
		enabled: !!uuid,
	});
