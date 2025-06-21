export const bankQK = {
	all: () => ['procure'],

	// * bank
	bank: () => [...bankQK.all(), 'categories'],
	bankByUUID: (uuid: string) => [...bankQK.bank(), uuid],
};
