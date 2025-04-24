import useTQuery from '@/hooks/useTQuery';

import { vendorQK } from './queryKeys';

// ? INQUIRY
// * ALL Department
export const useVendor = <T>() =>
	useTQuery<T>({
		queryKey: vendorQK.vendor(),
		url: `/procure/vendor`,
	});

export const useVendorByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: vendorQK.vendorByUUID(uuid),
		url: `/procure/vendor/${uuid}`,
		enabled: !!uuid,
	});
export const useItems = <T>(param: string) =>
	useTQuery<T>({
		queryKey: vendorQK.item(param),
		url: `/procure/item?${param}`,
	});
