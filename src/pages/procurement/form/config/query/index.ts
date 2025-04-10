import useTQuery from '@/hooks/useTQuery';

import { formQK } from './queryKeys';

// ? INQUIRY
// * ALL
export const useForm = <T>() =>
	useTQuery<T>({
		queryKey: formQK.form(),
		url: `/procure/form`,
	});

export const useFormByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: formQK.formByUUID(uuid),
		url: `/procure/form/${uuid}`,
		enabled: !!uuid,
	});
