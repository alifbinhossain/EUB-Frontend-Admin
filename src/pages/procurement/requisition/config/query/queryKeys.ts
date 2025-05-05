export const requisitionQK = {
	all: () => ['procure'],

	// * Requisition
	requisition: () => [...requisitionQK.all(), 'requisition'],
	requisitionByUUID: (uuid: string) => [...requisitionQK.requisition(), uuid],
	requisitionAndItemByUUID: (uuid: string) => [...requisitionQK.all(), 'requisition', 'item', uuid],
	requisitionAndItemForPDF: (uuid: string) => [...requisitionQK.all(), 'requisition', 'item', uuid, 'pdf'],
};
