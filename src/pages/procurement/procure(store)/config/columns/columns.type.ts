// * Items
export type IItemsWorkOrderEntryTableData = {
	uuid: string;
	item_work_order_uuid: string;
	request_quantity: number;
	provided_quantity: number;
	unit_price: number;
};
// * capital

export type IProcureStoreTableData = {
	uuid: string;
	vendor_name: string;
	bill_id: string;
	bank_name: string;
	remarks: string;
	bill_uuid: string;
	vendor_uuid: string;
	total_amount: number;

	done: boolean;
	done_date: string;
	is_delivery_statement: boolean;

	work_order_remarks: string;
	delivery_statement_remarks: string;
	delivery_statement_date: string;
	item_work_order_entry: IItemsWorkOrderEntryTableData[];

	created_by_name: string;
	created_at: string;
	updated_at: string;
};
