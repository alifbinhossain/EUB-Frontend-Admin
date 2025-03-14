import useTQuery from '@/hooks/useTQuery';

import { subCategoryQK } from './queryKeys';

// * SUBCATEGORY
export const useSubCategory = <T>() =>
	useTQuery<T>({
		queryKey: subCategoryQK.subcategory(),
		url: `/procure/sub-category`,
	});

export const useSubCategoryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: subCategoryQK.subcategoryByUUID(uuid),
		url: `/procure/sub-category/${uuid}`,
		enabled: !!uuid,
	});
