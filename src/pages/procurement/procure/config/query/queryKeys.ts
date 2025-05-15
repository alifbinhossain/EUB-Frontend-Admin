export const capitalQK = {
	all: () => ['capital'],

	// * category
	capital: () => [...capitalQK.all(), 'all-capital'],
	quotations: (uuid: string) => [...capitalQK.capital(), 'quotations', uuid],
	generalNotes: (uuid: string) => [...capitalQK.capital(), 'general-notes', uuid],
	capitalDetails: (uuid: string) => [...capitalQK.all(), 'capital-details', uuid],
	itemByVendor: (uuid: string, query?: string) => [
		...capitalQK.all(),
		'item-vendor',
		uuid,
		...(query ? [query] : []),
	],
};
