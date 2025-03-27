export const itemWordOrderQK = {
	all: () => ['item-work-order'],

	// * category
	itemWorkOrder: () => [...itemWordOrderQK.all(), 'item-work-orders'],
	itemWorkOrderByUUID: (uuid: string) => [...itemWordOrderQK.itemWorkOrder(), uuid],
	itemWorkOrderAndEntry: (uuid: string) => [...itemWordOrderQK.all(), 'item-working-order-and-entry', uuid],
	itemByVendor: (uuid: string, query?: string) => [
		...itemWordOrderQK.all(),
		'item-vendor',
		uuid,
		...(query ? [query] : []),
	],
};
