import useTQuery from '@/hooks/useTQuery';

import { inquiryQK } from './queryKeys';

// ? INQUIRY
// * ALL Department
export const useVisitor = <T>() =>
	useTQuery<T>({
		queryKey: inquiryQK.visitor(),
		url: `/inquire/visitor`,
	});

export const useVisitorByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: inquiryQK.visitorByUUID(uuid),
		url: `/inquire/visitor/${uuid}`,
		enabled: !!uuid,
	});
