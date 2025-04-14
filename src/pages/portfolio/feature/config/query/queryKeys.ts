export const featureQK = {
	all: () => ['portfolio'],

	// * Feature
	feature: () => [...featureQK.all(), 'feature'],
	featureByUUID: (uuid: string) => [...featureQK.feature(), uuid],
};
