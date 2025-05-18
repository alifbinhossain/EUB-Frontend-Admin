export const purchaseCostCenterQK = {
	all: () => ['procurement'],

	// * category
	subPurchase: () => [...purchaseCostCenterQK.all(), 'sub-purchase-cost-centers'],
	subPurchaseByUUID: (uuid: string) => [...purchaseCostCenterQK.subPurchase(), uuid],
};
