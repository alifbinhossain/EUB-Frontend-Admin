export const requisitionQK = {
	all: () => ['procure'],

	// * Requisition
	requisition: (uuid?: string, status?: string) => [...requisitionQK.all(), 'requisition', uuid, status],
	requisitionByUUID: (uuid: string) => [...requisitionQK.requisition(), uuid],
	requisitionAndItemByUUID: (uuid: string) => [...requisitionQK.all(), 'requisition', 'item', uuid],
	requisitionAndItemForPDF: (uuid: string) => [...requisitionQK.all(), 'requisition', 'item', uuid, 'pdf'],
};
