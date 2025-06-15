export const fdeQK = {
	all: () => ['fde'],

	// * Question Category
	questionCategory: () => [...fdeQK.all(), 'question-category'],
	questionCategoryByUUID: (uuid: string) => [...fdeQK.questionCategory(), uuid],

	//*Question
	question: () => [...fdeQK.all(), 'question'],
	questionByUUID: (uuid: string) => [...fdeQK.question(), uuid],
};
