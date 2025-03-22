import useTQuery from '@/hooks/useTQuery';

import { serviceQK } from './queryKeys';

export const useService = <T>() =>
	useTQuery<T>({
		queryKey: serviceQK.service(),
		url: `/procure/service`,
	});

export const useItemWordOrderByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: serviceQK.itemWorkOrderByUUID(uuid),
		url: `/procure/item-work-order/${uuid}`,
		enabled: !!uuid,
	});

export const useItemWorkOrderAndEntry = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: serviceQK.itemWorkOrderAndEntry(uuid),
		url: `procure/item-work-order-details/by/work-order-uuid/${uuid}`,
		enabled: !!uuid,
	});

// Item by Vendor
export const useItemByVendor = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: serviceQK.itemByVendor(uuid),
		url: `/procure/item/by/vendor-uuid/${uuid}`,
		enabled: !!uuid,
	});
