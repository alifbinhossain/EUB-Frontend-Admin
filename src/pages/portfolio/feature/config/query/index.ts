import useTQuery from '@/hooks/useTQuery';

import { featureQK } from './queryKeys';

// ? INQUIRY
// * ALL
export const useFeature = <T>() =>
	useTQuery<T>({
		queryKey: featureQK.feature(),
		url: `/portfolio/feature?is_pagination=false`,
	});

export const useFeatureByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: featureQK.featureByUUID(uuid),
		url: `/portfolio/feature/${uuid}`,
		enabled: !!uuid,
	});
