import { IParams } from '@/types';

export const hrQK = {
	all: () => ['admin'],

	//* designation
	designation: () => [...hrQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...hrQK.designation(), uuid],
};

export const facultyQK = {
	all: () => ['faculty'],
	faculty: () => [...facultyQK.all(), 'faculty'],
	facultyByUUID: (uuid: string) => [...facultyQK.faculty(), uuid],
};

export const departmentQK = {
	all: () => ['department'],
	department: () => [...departmentQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...departmentQK.department(), uuid],
};
