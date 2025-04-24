import useTQuery from '@/hooks/useTQuery';

import { itemQK } from './queryKeys';

// * ITEM
export const useItem = <T>() =>
	useTQuery<T>({
		queryKey: itemQK.item(),
		url: `/procure/item`,
	});

export const useItemByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: itemQK.itemByUUID(uuid),
		url: `/procure/item/${uuid}`,
		enabled: !!uuid,
	});

export const useItemAndVendorByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: itemQK.itemAndVendorByUUID(uuid),
		url: `/procure/item-details/by/item-uuid/${uuid}`,
		enabled: !!uuid,
	});

export const useVendors = <T>(param: string) =>
	useTQuery<T>({
		queryKey: itemQK.vendor(),
		url: `/procure/item-vendor?${param}`,
		enabled: !!param,
	});
