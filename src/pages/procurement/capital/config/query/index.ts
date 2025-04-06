import useTQuery from '@/hooks/useTQuery';

import { capitalQK } from './queryKeys';

export const useCapital = <T>() =>
	useTQuery<T>({
		queryKey: capitalQK.capital(),
		url: `/procure/capital`,
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
