export const itemQK = {
	all: () => ['item'],

	// * category
	item: () => [...itemQK.all(), 'items'],
	itemByUUID: (uuid: string) => [...itemQK.item(), uuid],
	itemAndVendorByUUID: (uuid: string) => [...itemQK.all(), 'item', 'item-vendor', uuid],
	vendor: () => [...itemQK.all(), 'vendor'],
};
