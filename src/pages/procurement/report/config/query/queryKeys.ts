import { pipeline } from 'stream';

export const reportQK = {
	all: () => ['procurement'],

	// * report
	item: () => [...reportQK.all(), 'report-item'],
	itemByUUID: (uuid: string) => [...reportQK.item(), uuid],

	pipeline: () => [...reportQK.all(), 'pipeline'],
};
