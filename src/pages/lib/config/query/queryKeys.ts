export const fdeQK = {
	all: () => ['fde'],

	// * Semester
	semester: () => [...fdeQK.all(), 'semester'],
	semesterByUUID: (uuid: string) => [...fdeQK.semester(), uuid],
};
