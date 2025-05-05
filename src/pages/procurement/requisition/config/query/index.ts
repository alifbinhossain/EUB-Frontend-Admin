import useTQuery from '@/hooks/useTQuery';

import { requisitionQK } from './queryKeys';

// * REQUISITION
export const useRequisition = <T>(showAll?: boolean, uuid?: string) =>
	useTQuery<T>({
		queryKey: requisitionQK.requisition(),
		url: showAll ? `/procure/requisition` : `/procure/requisition?user_uuid=${uuid}`,
		enabled: !!showAll || !!uuid,
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
export const useRequisitionAndItemForPDF = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: requisitionQK.requisitionAndItemForPDF(uuid),
		url: `report/procure/item-requisition-details/by/${uuid}`,
		enabled: !!uuid,
	});
