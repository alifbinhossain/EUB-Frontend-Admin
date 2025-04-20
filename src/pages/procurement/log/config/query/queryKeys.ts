export const ItemTransferQK = {
	all: () => ['procurement'],

	// * vendor
	itemTransfer: () => [...ItemTransferQK.all(), 'item-transfer'],
	itemTransferByUUID: (uuid: string) => [...ItemTransferQK.itemTransfer(), uuid],
};
