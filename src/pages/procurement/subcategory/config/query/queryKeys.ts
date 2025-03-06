export const subCategoryQK = {
	all: () => ['subcategory'],

	// * category
	subcategory: () => [...subCategoryQK.all(), 'subcategories'],
	subcategoryByUUID: (uuid: string) => [...subCategoryQK.subcategory(), uuid],
};
