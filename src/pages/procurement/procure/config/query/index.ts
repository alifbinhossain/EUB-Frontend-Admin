import useTQuery from '@/hooks/useTQuery';

import { capitalQK } from './queryKeys';

export const useCapital = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: capitalQK.capital(query ? query : ''),
		url: query ? `/procure/capital?${query}` : `/procure/capital`,
	});

export const useQuotations = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: capitalQK.quotations(uuid),
		url: `/procure/capital-vendor/${uuid}`,
		enabled: !!uuid,
	});

export const useGeneralNotes = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: capitalQK.generalNotes(uuid),
		url: `/procure/general-note/${uuid}`,
		enabled: !!uuid,
	});

export const useCapitalDetails = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: capitalQK.capitalDetails(uuid),
		url: `procure/capital/${uuid}`,
		enabled: !!uuid,
	});

// Item by Vendor
export const useItemByVendor = <T>(uuid: string, query?: string) =>
	useTQuery<T>({
		queryKey: capitalQK.itemByVendor(uuid, query),
		url: query ? `/procure/item/by/vendor-uuid/${uuid}?${query}` : `/procure/item/by/vendor-uuid/${uuid}`,
		enabled: !!uuid,
	});
//* summery
export const useCapitalSummery = <T>() =>
	useTQuery<T>({
		queryKey: capitalQK.capitalSummery(),
		url: `/procure/capital-summary-by-status`,
	});
