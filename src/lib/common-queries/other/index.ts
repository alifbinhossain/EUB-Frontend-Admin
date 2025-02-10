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

//* GET OTHER PROGRAMS
export const useOtherPrograms = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.programs(),
		url: `/other/portfolio/program/value/label`,
	});

//* GET OTHER DEPARTMENTS
export const useOtherDepartments = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.departments(),
		url: `/other/portfolio/department/value/label`,
	});
