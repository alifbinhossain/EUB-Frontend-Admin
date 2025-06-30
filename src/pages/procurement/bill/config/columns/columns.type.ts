// * bill payment
export type IBillPaymentTableData = {
	uuid: string;
	bill_uuid: string;
	type: 'partial' | 'full';
	amount: number;
};

//* Item Work Order
export type IItemWorkOrderTableData = {
	item_work_order_id: string;
	total_amount: number;
};

// * bill
export type IBillTableData = {
	is_completed: boolean;
	bill_id: string;
	uuid: string;
	vendor_uuid: string;
	vendor_name: string;
	bank_uuid: string;
	bank_name: string;
	item_work_order_uuid: string[];
	total_bill_amount: number;
	total_amount: number;
	item_work_order: IItemWorkOrderTableData[];
	bill_payment: IBillPaymentTableData[];
	remarks: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
};
