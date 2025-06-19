export const procureStoreQK = {
	all: () => ['procure-store'],

	// * category

	itemWorkOrder: (query?: string) => [...procureStoreQK.all(), 'item-work_order', query ? query : ''],
	itemWorkOrderByUUID: (uuid: string) => [...procureStoreQK.all(), uuid],
	itemWorkOrderByVendorUUID: (uuid: string) => [...procureStoreQK.all(), 'item-work_order', uuid],
};
