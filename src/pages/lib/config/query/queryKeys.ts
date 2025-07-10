export const fdeQK = {
	all: () => ['library'],

	// * Semester
	semester: () => [...fdeQK.all(), 'semester'],
	semesterByUUID: (uuid: string) => [...fdeQK.semester(), uuid],

	// * Room
	room: () => [...fdeQK.all(), 'room'],
	roomByUUID: (uuid: string) => [...fdeQK.room(), uuid],

	//*Room Allocation
	roomAllocation: (query?: string) => [...fdeQK.all(), 'room-allocation', ...(query ? [query] : [])],
	roomAllocationByUUID: (uuid: string) => [...fdeQK.roomAllocation(), uuid],

	//*Course
	course: () => [...fdeQK.all(), 'course'],
	courseByUUID: (uuid: string) => [...fdeQK.course(), uuid],

	//*Course Section
	courseSection: () => [...fdeQK.all(), 'course-section'],
	courseSectionByUUID: (uuid: string) => [...fdeQK.courseSection(), uuid],

	// * Course Assign

	courseAssignByUUID: (uuid: string, query?: string) => ['course-assign', uuid, ...(query ? [query] : [])],

	//*list
	list: () => [...fdeQK.all(), 'list'],
	semCrsThrEntryByUUID: (uuid: string) => [...fdeQK.list(), uuid],
};
