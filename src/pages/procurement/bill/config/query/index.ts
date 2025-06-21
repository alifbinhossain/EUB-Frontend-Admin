import useTQuery from '@/hooks/useTQuery';

import { billQK } from './queryKeys';

export const useBill = <T>() =>
	useTQuery<T>({
		queryKey: billQK.bill(),
		url: `/procure/bill`,
	});

export const useBillByDetails = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: billQK.billByUUID(uuid),
		url: `/procure/bill-and-bill-payment-details/${uuid}`,
		enabled: !!uuid,
	});
