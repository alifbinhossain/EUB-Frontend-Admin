import useTQuery from '@/hooks/useTQuery';

import { serviceVendorQK } from './queryKeys';

// ? INQUIRY
// * ALL Department
export const useServiceVendor = <T>() =>
	useTQuery<T>({
		queryKey: serviceVendorQK.serviceVendor(),
		url: `/procure/service-vendor`,
	});

export const useServiceVendorByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: serviceVendorQK.serviceVendorByUUID(uuid),
		url: `/procure/service-vendor/${uuid}`,
		enabled: !!uuid,
	});
