import useTQuery from '@/hooks/useTQuery';

import { workQK } from './queryKeys';

// * Problem
export const useWorkProblems = <T>() =>
	useTQuery<T>({
		queryKey: workQK.problem(),
		url: '/work/problem',
	});

export const useWorkProblemsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.problemByUUID(uuid),
		url: `/work/problem/${uuid}`,
		enabled: !!uuid,
	});

//* Order
export const useWorkJobs = <T>() =>
	useTQuery<T>({
		queryKey: workQK.job(),
		url: '/work/order',
	});
export const useWorkJobsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.jobByUUID(uuid),
		url: `/work/order/${uuid}`,
		enabled: !!uuid,
	});

export const useWorkOrderByDetails = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.orderByDetails(uuid),
		url: `/work/diagnosis-details-by-order/${uuid}`,
		enabled: !!uuid,
	});

//* Diagnosis
export const useWorkDiagnosis = <T>() =>
	useTQuery<T>({
		queryKey: workQK.diagnosis(),
		url: '/work/diagnosis',
	});
export const useWorkDiagnosisByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.diagnosisByUUID(uuid),
		url: `/work/diagnosis/${uuid}`,
		enabled: !!uuid,
	});
//* Section
export const useWorkSections = <T>() =>
	useTQuery<T>({
		queryKey: workQK.section(),
		url: '/work/section',
	});
export const useWorkSectionsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.sectionByUUID(uuid),
		url: `/work/section/${uuid}`,
		enabled: !!uuid,
	});
