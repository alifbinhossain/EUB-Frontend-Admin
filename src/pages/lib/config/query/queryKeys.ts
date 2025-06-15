export const fdeQK = {
	all: () => ['library'],

	// * Semester
	semester: () => [...fdeQK.all(), 'semester'],
	semesterByUUID: (uuid: string) => [...fdeQK.semester(), uuid],

	//*Course
	course: () => [...fdeQK.all(), 'course'],
	courseByUUID: (uuid: string) => [...fdeQK.course(), uuid],

	//*Course Section
	courseSection: () => [...fdeQK.all(), 'course-section'],
	courseSectionByUUID: (uuid: string) => [...fdeQK.courseSection(), uuid],
};
