import useTQuery from '@/hooks/useTQuery';

import { ItemTransferQK } from './queryKeys';

//* ITem Requested
export const useItemRequested = <T>() =>
	useTQuery<T>({
		queryKey: ItemTransferQK.itemRequested(),
		url: `/procure/item-work-order-entry`,
	});
export const useItemRequestedByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: ItemTransferQK.itemRequestedByUUID(uuid),
		url: `/procure/item-work-order-entry`,
	});
