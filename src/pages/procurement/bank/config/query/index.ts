import useTQuery from '@/hooks/useTQuery';

import { bankQK } from './queryKeys';

export const useBank = <T>() =>
	useTQuery<T>({
		queryKey: bankQK.bank(),
		url: `/procure/bank`,
	});

export const useBankByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: bankQK.bankByUUID(uuid),
		url: `/procure/bank/${uuid}`,
		enabled: !!uuid,
	});
