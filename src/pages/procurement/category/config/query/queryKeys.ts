export const categoryQK = {
	all: () => ['category'],

	// * category
	category: () => [...categoryQK.all(), 'categories'],
	categoryByUUID: (uuid: string) => [...categoryQK.category(), uuid],
};
