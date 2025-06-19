export const procureStoreQK = {
	all: () => ['procure-store'],

	// * category

	itemWorkOrder: () => [...procureStoreQK.all(), 'item-work_order'],
	itemWorkOrderByUUID: (uuid: string) => [...procureStoreQK.all(), uuid],
};
