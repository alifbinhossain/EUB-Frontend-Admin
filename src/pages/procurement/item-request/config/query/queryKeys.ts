export const ItemTransferQK = {
	all: () => ['procurement'],

	//* Item Requested
	itemRequested: () => [...ItemTransferQK.all(), 'item-requested'],
	itemRequestedByUUID: (uuid: string) => [...ItemTransferQK.itemRequested(), uuid],
};
