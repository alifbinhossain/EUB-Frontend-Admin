export const serviceQK = {
	all: () => ['service'],

	// * category
	service: () => [...serviceQK.all(), 'all-service'],
	itemWorkOrderByUUID: (uuid: string) => [...serviceQK.service(), uuid],
	itemWorkOrderAndEntry: (uuid: string) => [...serviceQK.all(), 'item-working-order-and-entry', uuid],
	itemByVendor: (uuid: string) => [...serviceQK.all(), 'item-vendor', uuid],
};
