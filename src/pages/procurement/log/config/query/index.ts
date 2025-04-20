import useTQuery from '@/hooks/useTQuery';

import { ItemTransferQK } from './queryKeys';

// ? INQUIRY
// * ALL Department
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
