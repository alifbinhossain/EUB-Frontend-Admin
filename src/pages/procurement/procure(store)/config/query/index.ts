import useTQuery from '@/hooks/useTQuery';

import { procureStoreQK } from './queryKeys';

export const useItemWorkOrder = <T>() =>
	useTQuery<T>({
		queryKey: procureStoreQK.itemWorkOrder(),
		url: `/procure/item-work-order`,
	});

export const useItemWorkOrderByDetails = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: procureStoreQK.itemWorkOrderByUUID(uuid),
		url: `/procure/item-work-order-details/by/work-order-uuid/${uuid}`,
		enabled: !!uuid,
	});
