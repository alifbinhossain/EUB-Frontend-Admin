export const formQK = {
	all: () => ['procurement'],

	// * vendor
	form: () => [...formQK.all(), 'form'],
	formByUUID: (uuid: string) => [...formQK.form(), uuid],
};
