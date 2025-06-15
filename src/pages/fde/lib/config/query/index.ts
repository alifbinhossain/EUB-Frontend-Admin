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
