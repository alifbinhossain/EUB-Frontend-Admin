import useTQuery from '@/hooks/useTQuery';

import otherQK from './query-keys';

//* GET OTHER HR
export const useOtherHR = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.hr(),
		url: `/other/hr/value/label`,
	});

//* GET OTHER DEPARTMENT
export const useOtherDepartment = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.department(),
		url: `/other/hr/department/value/label`,
	});

//* GET OTHER Designation
export const useOtherDesignation = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.designation(),
		url: `/other/hr/designation/value/label`,
	});

//* GET OTHER FACULTY
export const useOtherFaculty = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.faculty(),
		url: `/other/portfolio/faculty/value/label`,
	});

//* GET OTHER USER
export const useOtherUser = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.user(),
		url: `/other/hr/users/value/label`,
	});
//* GET OTHER USER BY QUERY
export const useOtherUserQuery = <T>(query: string = '') =>
	useTQuery<T>({
		queryKey: otherQK.userByQuery(query),
		url: `/other/hr/users/value/label?${query}`,
	});

//* GET OTHER Teachers
export const useOtherTeachers = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.teachers(),
		url: `/other/portfolio/teachers/value/label`,
	});

//* GET OTHER PROGRAMS
export const useOtherPrograms = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.programs(),
		url: `/other/portfolio/program/value/label`,
	});

//* GET OTHER DEPARTMENTS
export const useOtherDepartments = <T>(query: string = '') =>
	useTQuery<T>({
		queryKey: otherQK.departments(query),
		url: query
			? `/other/portfolio/department/value/label?access=${query}`
			: `/other/portfolio/department/value/label`,
	});

// * GET OTHER CATEGORY
export const useOtherCategory = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.category(),
		url: `/other/procure/category/value/label`,
	});

// * GET OTHER SUB CATEGORY
export const useOtherSubCategory = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.subCategory(),
		url: `/other/procure/sub-category/value/label`,
	});

// * GET OTHER PURCHASE COST CENTER
export const useOtherPurchaseCostCenter = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.purchaseCostCenter(),
		url: `/other/procure/purchase-cost-center/value/label`,
	});
// * GET OTHER SUB PURCHASE COST CENTER
export const useOtherSubPurchaseCostCenter = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: otherQK.subPurchaseCostCenter(),
		url: query
			? `/other/procure/sub-purchase-cost-center/value/label${query}`
			: `/other/procure/sub-purchase-cost-center/value/label`,
	});

// * GET OTHER VENDOR
export const useOtherVendor = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.vendor(),
		url: `/other/procure/vendor/value/label`,
	});

// * GET OTHER INTERNAL COST CENTER
export const useOtherInternalCostCenter = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.internalCostCenter(),
		url: `/other/procure/internal-cost-center/value/label`,
	});
// * GET OTHER ITEM
export const useOtherItem = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.item(),
		url: `/other/procure/item/value/label`,
	});

//* GET OTHER QUESTION CATEGORY
export const useOtherQuestionCategory = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.questionCategory(),
		url: `/other/fde/qns-category/value/label`,
	});
