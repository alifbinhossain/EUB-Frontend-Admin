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
