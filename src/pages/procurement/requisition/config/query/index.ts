import useTQuery from '@/hooks/useTQuery';

import { requisitionQK } from './queryKeys';

// * REQUISITION
export const useRequisition = <T>() =>
	useTQuery<T>({
		queryKey: requisitionQK.requisition(),
		url: `/procure/requisition`,
	});

export const useRequisitionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: requisitionQK.requisitionByUUID(uuid),
		url: `/procure/requisition/${uuid}`,
		enabled: !!uuid,
	});

export const useRequisitionAndItemByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: requisitionQK.requisitionAndItemByUUID(uuid),
		url: `/procure/item-requisition-details/by/${uuid}`,
		enabled: !!uuid,
	});
