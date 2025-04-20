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
