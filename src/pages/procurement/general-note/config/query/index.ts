import useTQuery from '@/hooks/useTQuery';

import { generalNoteQK } from './queryKeys';

// ? INQUIRY
// * ALL Department
export const useGeneralNote = <T>() =>
	useTQuery<T>({
		queryKey: generalNoteQK.generalNote(),
		url: `/procure/general-note`,
	});

export const useGeneralNoteByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: generalNoteQK.generalNoteByUUID(uuid),
		url: `/procure/general-note/${uuid}`,
		enabled: !!uuid,
	});
