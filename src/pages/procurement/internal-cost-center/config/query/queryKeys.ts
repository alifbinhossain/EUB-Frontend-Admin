export const internalCostCenterQK = {
	all: () => ['procure'],

	// * internalCostCenter
	internalCostCenter: () => [...internalCostCenterQK.all(), 'internal-cost-center'],
	internalCostCenterByUUID: (uuid: string) => [...internalCostCenterQK.internalCostCenter(), uuid],
};
