import useTQuery from '@/hooks/useTQuery';

import { ticketQK } from './queryKeys';

export const useTicket = <T>() =>
	useTQuery<T>({
		queryKey: ticketQK.ticket(),
		url: `/procure/req-ticket`,
	});

export const useTicketDetails = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: ticketQK.ticketDetails(uuid),
		url: `/procure/req-ticket/${uuid}`,
		enabled: !!uuid,
	});
