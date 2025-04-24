// *Item Transfer
export type IITemTransferTableData = {
	uuid: string;
	item_uuid: string;
	item_name: string;
	quantity: number;
	max_quantity: number;
	reason: string;
	is_requisition_received: boolean;
};

// *Item work Order Entry

export type IItemWorkOrderTableData = {
	uuid: string;
	item_work_order_name: string;
	item_name: string;
	quantity: number;
	unit_price: number;
	is_received: boolean;
	received_date: string;
};

//* Item Requisition
export type IItemRequisitionTableData = {
	uuid: string;
	item_name: string;
	requisition_name: string;
	req_quantity: number;
	provided_quantity: number;
};
