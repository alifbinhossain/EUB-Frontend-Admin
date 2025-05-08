// * Item Work Order
export type IItemWorkOrderTableData = {
	uuid: string;
	vendor_name: string;
	status: string;
	remarks: string;

	item_work_order_entry: IItemWorkOrderEntryTableData[];

	created_at: string;
	created_by_name: string;
	updated_at: string;
};

export type IItemWorkOrderEntryTableData = {
	item_name: string;
	quantity: number;
	unit_price: number;
	is_received: boolean;
	received_date: string;
};
