import useTQuery from '@/hooks/useTQuery';

import { procurementQK } from './queryKeys';

// ? INQUIRY
// *Process
export const useProcess = <T>() =>
	useTQuery<T>({
		queryKey: procurementQK.process(),
		url: `/procure/process`,
	});

export const useProcessByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: procurementQK.processByUUID(uuid),
		url: `/procure/process/${uuid}`,
		enabled: !!uuid,
	});
