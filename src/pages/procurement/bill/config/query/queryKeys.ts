export const billQK = {
	all: () => ['procure'],

	// * category

	bill: () => [...billQK.all(), 'bill'],
	billByUUID: (uuid: string) => [...billQK.all(), uuid],
};
