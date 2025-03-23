import useTQuery from '@/hooks/useTQuery';

import { serviceQK } from './queryKeys';

export const useService = <T>() =>
	useTQuery<T>({
		queryKey: serviceQK.service(),
		url: `/procure/service`,
	});

export const useQuotations = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: serviceQK.quotations(uuid),
		url: `/procure/service-vendor/${uuid}`,
		enabled: !!uuid,
	});

export const useGeneralNotes = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: serviceQK.generalNotes(uuid),
		url: `/procure/general-note/${uuid}`,
		enabled: !!uuid,
	});

export const useServiceDetails = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: serviceQK.serviceDetails(uuid),
		url: `procure/service/${uuid}`,
		enabled: !!uuid,
	});
