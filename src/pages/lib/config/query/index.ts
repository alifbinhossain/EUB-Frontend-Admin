import useTQuery from '@/hooks/useTQuery';

import { fdeQK } from './queryKeys';

// * Semester
export const useFDESemester = <T>() =>
	useTQuery<T>({
		queryKey: fdeQK.semester(),
		url: `/lib/semester`,
	});

export const useFDESemesterByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: fdeQK.semesterByUUID(uuid),
		url: `/lib/semester/${uuid}`,
		enabled: !!uuid,
	});

// * Room
export const useFDERoom = <T>() =>
	useTQuery<T>({
		queryKey: fdeQK.room(),
		url: `/lib/room`,
	});

export const useFDERoomByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: fdeQK.roomByUUID(uuid),
		url: `/lib/room/${uuid}`,
		enabled: !!uuid,
	});

//* Course
export const useFDECourse = <T>() =>
	useTQuery<T>({
		queryKey: fdeQK.course(),
		url: `/lib/course`,
	});
export const useFDECourseByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: fdeQK.courseByUUID(uuid),
		url: `/lib/course/${uuid}`,
		enabled: !!uuid,
	});

//* Course Section
export const useCourseSection = <T>() =>
	useTQuery<T>({
		queryKey: fdeQK.courseSection(),
		url: `/lib/course-section`,
	});

export const useCourseSectionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: fdeQK.courseSectionByUUID(uuid),
		url: `/lib/course-section/${uuid}`,
		enabled: !!uuid,
	});

// * course assign

export const useCourseAssignByUUID = <T>(uuid: string, query?: string) =>
	useTQuery<T>({
		queryKey: fdeQK.courseAssignByUUID(uuid, query),
		url: query ? `/lib/course-section-details/${uuid}?${query}` : `/lib/course-section-details/${uuid}`,
		enabled: !!uuid,
	});

//* FDE Evolution
export const useFDEList = <T>() =>
	useTQuery<T>({
		queryKey: fdeQK.list(),
		url: `lib/sem-crs-thr-entry`,
	});
export const useSemCrsThrEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: fdeQK.semCrsThrEntryByUUID(uuid),
		url: `/lib/sem-crs-thr-entry/${uuid}`,
		enabled: !!uuid,
	});
//* Room Allocation
export const useRoomAllocationData = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: fdeQK.roomAllocation(query ? query : ''),
		url: query ? `/lib/room-allocation?${query}` : `/lib/room-allocation`,
	});
