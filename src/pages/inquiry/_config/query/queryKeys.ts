export const inquiryQK = {
	all: () => ['inquiry'],

	// * visitor
	visitor: () => [...inquiryQK.all(), 'visitor'],
	visitorByUUID: (uuid: string) => [...inquiryQK.visitor(), uuid],
};
