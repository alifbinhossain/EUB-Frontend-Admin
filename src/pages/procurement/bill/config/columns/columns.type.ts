// * bill
export type IBillTableData = {
	bill_id: string;
	uuid: string;
	vendor_uuid: string;
	bank_uuid: string;
	item_work_order_uuid: string[];
	bill_payments: IBillPaymentTableData[];
	created_by_name: string;
	created_at: string;
	updated_at: string;
};

// * bill payment
export type IBillPaymentTableData = {
	uuid: string;
	bill_uuid: string;
	type: 'partial' | 'full';
	amount: number;
};
