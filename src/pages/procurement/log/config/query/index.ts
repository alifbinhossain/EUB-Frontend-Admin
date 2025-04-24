import useTQuery from '@/hooks/useTQuery';

import { ItemTransferQK } from './queryKeys';

// ? INQUIRY
// * ALL ITEM TRANSFER
export const useItemTransfer = <T>() =>
	useTQuery<T>({
		queryKey: ItemTransferQK.itemTransfer(),
		url: `/procure/item-transfer`,
	});

export const useItemTransferByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: ItemTransferQK.itemTransferByUUID(uuid),
		url: `/procure/item-transfer/${uuid}`,
		enabled: !!uuid,
	});

// * ALL WORK ORDER ENTRY
export const useItemWorkOrderEntry = <T>() =>
	useTQuery<T>({
		queryKey: ItemTransferQK.itemWorkOrderEntry(),
		url: `/procure/item-work-order-entry`,
	});
export const useItemWorkOrderEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: ItemTransferQK.itemWorkOrderEntryByUUID(uuid),
		url: `/procure/item-work-order-entry/${uuid}`,
		enabled: !!uuid,
	});
// * ALL ITEM REQUISITION
export const useItemRequisition = <T>() =>
	useTQuery<T>({
		queryKey: ItemTransferQK.itemRequisition(),
		url: `/procure/item-requisition`,
	});
export const useItemRequisitionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: ItemTransferQK.itemRequisitionByUUID(uuid),
		url: `/procure/item-requisition/${uuid}`,
		enabled: !!uuid,
	});
