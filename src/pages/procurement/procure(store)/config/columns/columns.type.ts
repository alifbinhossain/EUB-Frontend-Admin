// * capital
export type IProcureStoreTableData = {
	uuid: string;
	vendor_name: string;
	remarks: string;
	bill_uuid: string;
	vendor_uuid: string;

	done: boolean;
	is_delivery_statement: boolean;

	work_order_remarks: string;
	delivery_statement_remarks: string;
	delivery_statement_date: string;
	item_work_order_entry: IItemsWorkOrderTableData[];

	created_by_name: string;
	created_at: string;
	updated_at: string;
};

// * Items
export type IItemsWorkOrderTableData = {
	uuid: string;
	item_work_order_uuid: string;
	request_quantity: number;
	provided_quantity: number;
	unit_price: number;
};
