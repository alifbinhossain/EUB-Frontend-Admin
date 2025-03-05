export const itemQK = {
	all: () => ['item'],

	// * category
	item: () => [...itemQK.all(), 'items'],
	itemByUUID: (uuid: string) => [...itemQK.item(), uuid],
};
