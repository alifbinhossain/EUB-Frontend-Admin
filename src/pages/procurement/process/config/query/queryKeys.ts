export const procurementQK = {
	all: () => ['procurement'],

	// * visitor
	process: () => [...procurementQK.all(), 'visitor'],
	processByUUID: (uuid: string) => [...procurementQK.process(), uuid],
};
