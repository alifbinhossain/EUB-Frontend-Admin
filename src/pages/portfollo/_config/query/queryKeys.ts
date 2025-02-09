import { IParams } from '@/types';

export const portfolioQK = {
	all: () => ['portfolio'],

	//* designation
	designation: () => [...portfolioQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...portfolioQK.designation(), uuid],

	//* bot
	bot: () => [...portfolioQK.all(), 'bot'],
	botByUUID: (uuid: string) => [...portfolioQK.bot(), uuid],
};
