export const inquiryQK = {
	all: () => ['inquiry'],

	// * visitor
	visitor: () => [...inquiryQK.all(), 'visitor'],
	visitorByUUID: (uuid: string) => [...inquiryQK.visitor(), uuid],
	contactUs: (query?: string) => [...inquiryQK.all(), 'contact-us', query || ''],
	contactUsByUUID: (uuid: string) => [...inquiryQK.visitor(), uuid],
};
