export const serviceVendorQK = {
	all: () => ['procurement'],

	// * serviceVendor
	serviceVendor: () => [...serviceVendorQK.all(), 'service-vendor'],
	serviceVendorByUUID: (uuid: string) => [...serviceVendorQK.serviceVendor(), uuid],
};
