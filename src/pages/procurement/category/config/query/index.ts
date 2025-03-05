import useTQuery from '@/hooks/useTQuery';

import { categoryQK } from './queryKeys';

// ? INQUIRY
// * ALL Department
export const useCategory = <T>() =>
	useTQuery<T>({
		queryKey: categoryQK.category(),
		url: `/procure/category`,
	});

export const useCategoryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: categoryQK.categoryByUUID(uuid),
		url: `/procure/category/${uuid}`,
		enabled: !!uuid,
	});
