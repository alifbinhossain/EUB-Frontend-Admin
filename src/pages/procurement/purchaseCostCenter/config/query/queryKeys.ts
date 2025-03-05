export const purchaseCostCenterQK = {
	all: () => ['purchase-cost-center'],

	// * category
	purchase: () => [...purchaseCostCenterQK.all(), 'purchase-cost-centers'],
	purchaseByUUID: (uuid: string) => [...purchaseCostCenterQK.purchase(), uuid],
};
