// * Item Work Order
export type IItemWorkOrderTableData = {
	uuid: string;
	vendor_name: string;
	status: string;
};

// * Item
export type IItemTableData = {
	index: number;
	item_uuid: string;
	name: string;
	purchase_cost_center_name: string;
	vendor_price: number;
	price_validity: number;
	remarks: string;
};
