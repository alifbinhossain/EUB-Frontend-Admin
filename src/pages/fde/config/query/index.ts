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
export const useFDEQuestion = <T>() =>
	useTQuery<T>({
		queryKey: fdeQK.question(),
		url: `/fde/qns`,
	});

export const useFDEQuestionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: fdeQK.questionByUUID(uuid),
		url: `/fde/qns/${uuid}`,
		enabled: !!uuid,
	});
