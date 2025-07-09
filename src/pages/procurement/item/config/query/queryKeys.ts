export const itemQK = {
	all: () => ['item'],

	// * category
	item: (query?: string) => [...itemQK.all(), 'items', ...(query ? [query] : [])],
	itemByUUID: (uuid: string) => [...itemQK.item(), uuid],
	itemAndVendorByUUID: (uuid: string) => [...itemQK.all(), 'item', 'item-vendor', uuid],
	vendor: () => [...itemQK.all(), 'vendor'],
};
