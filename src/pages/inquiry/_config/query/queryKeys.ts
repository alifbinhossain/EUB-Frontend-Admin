export const inquiryQK = {
	all: () => ['inquiry'],

	// * visitor
	visitor: () => [...inquiryQK.all(), 'visitor'],
	visitorByUUID: (uuid: string) => [...inquiryQK.visitor(), uuid],
	contactUs: () => [...inquiryQK.all(), 'contact-us'],
	contactUsByUUID: (uuid: number) => [...inquiryQK.visitor(), uuid],
};
