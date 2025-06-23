export const ItemTransferQK = {
	all: () => ['procurement'],

	// * itemTransfer
	itemTransfer: () => [...ItemTransferQK.all(), 'item-transfer'],
	itemTransferByUUID: (uuid: string) => [...ItemTransferQK.itemTransfer(), uuid],

	// * itemWorkOrderEntry
	itemWorkOrderEntry: () => [...ItemTransferQK.all(), 'item-work-order-entry'],
	itemWorkOrderEntryByUUID: (uuid: string) => [...ItemTransferQK.itemWorkOrderEntry(), uuid],
	// * itemRequisition
	itemRequisition: () => [...ItemTransferQK.all(), 'item-requisition'],
	itemRequisitionByUUID: (uuid: string) => [...ItemTransferQK.itemRequisition(), uuid],

	//* Item Requested
	itemRequested: (query?: string) => [...ItemTransferQK.all(), 'item-requested', query],
	itemRequestedByUUID: (uuid: string) => [...ItemTransferQK.itemRequested(), uuid],
};
