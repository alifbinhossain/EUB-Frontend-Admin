import useTQuery from '@/hooks/useTQuery';

import { fdeQK } from './queryKeys';

// * Question Category
export const useFDEQuestionCategory = <T>() =>
	useTQuery<T>({
		queryKey: fdeQK.questionCategory(),
		url: `/fde/qns-category`,
	});

export const useFDEQuestionCategoryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: fdeQK.questionCategoryByUUID(uuid),
		url: `/fde/qns-category/${uuid}`,
		enabled: !!uuid,
	});
//* Question
export const useFDEQuestion = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: fdeQK.question(query ? query : ''),
		url: query ? `/fde/qns?${query}` : `/fde/qns`,
	});

export const useFDEQuestionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: fdeQK.questionByUUID(uuid),
		url: `/fde/qns/${uuid}`,
		enabled: !!uuid,
	});
//*Responding Student
export const useFDERespondingStudent = <T>() =>
	useTQuery<T>({
		queryKey: fdeQK.respondingStudent(),
		url: `/fde/respond-student`,
	});

export const useFDEFormFullResponse = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: fdeQK.formFullResponse(uuid),
		url: `/fde/respond-student-details-with-evaluation/${uuid}`,
		enabled: !!uuid,
	});

//* FDE Evolution
export const useFDEList = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: fdeQK.list(query ? query : ''),
		url: query ? `/lib/sem-crs-thr-entry?${query}` : `lib/sem-crs-thr-entry`,
	});
