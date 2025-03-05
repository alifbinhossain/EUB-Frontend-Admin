export const purchaseCostCenter = {
	all: () => ['subcategory'],

	// * category
	purchase: () => [...purchaseCostCenter.all(), 'subcategories'],
	purchaseByUUID: (uuid: string) => [...purchaseCostCenter.purchase(), uuid],
};
