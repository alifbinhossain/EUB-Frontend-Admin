import { IParams } from '@/types';

export const hrQK = {
	all: () => ['admin'],

	//* designation
	designation: () => [...hrQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...hrQK.designation(), uuid],
};
