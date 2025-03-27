import useTQuery from '@/hooks/useTQuery';

import { itemWordOrderQK } from './queryKeys';

// * SUBCATEGORY
export const useItemWordOrder = <T>() =>
	useTQuery<T>({
		queryKey: itemWordOrderQK.itemWorkOrder(),
		url: `/procure/item-work-order`,
	});

export const useItemWordOrderByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: itemWordOrderQK.itemWorkOrderByUUID(uuid),
		url: `/procure/item-work-order/${uuid}`,
		enabled: !!uuid,
	});

export const useItemWorkOrderAndEntry = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: itemWordOrderQK.itemWorkOrderAndEntry(uuid),
		url: `procure/item-work-order-details/by/work-order-uuid/${uuid}`,
		enabled: !!uuid,
	});

// Item by Vendor
export const useItemByVendor = <T>(uuid: string, query?: string) =>
	useTQuery<T>({
		queryKey: itemWordOrderQK.itemByVendor(uuid, query),
		url: query ? `/procure/item/by/vendor-uuid/${uuid}?${query}` : `/procure/item/by/vendor-uuid/${uuid}`,
		enabled: !!uuid,
	});
