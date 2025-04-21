import useTQuery from '@/hooks/useTQuery';

import { reportQK } from './queryKeys';

// * ALL Department
export const useReportItem = <T>(dateRange: { from: string; to: string }) =>
	useTQuery<T>({
		queryKey: reportQK.item(),
		url: `/report/procure/item-opening-closing-stock?from_date=${dateRange.from}&to_date=${dateRange.to}`,
	});
