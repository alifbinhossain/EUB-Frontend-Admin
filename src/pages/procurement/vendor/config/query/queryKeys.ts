export const vendorQK = {
	all: () => ['procurement'],

	// * vendor
	vendor: () => [...vendorQK.all(), 'vendor'],
	vendorByUUID: (uuid: string) => [...vendorQK.vendor(), uuid],
};
