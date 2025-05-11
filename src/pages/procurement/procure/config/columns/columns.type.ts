// * capital
export type ICapitalTableData = {
	uuid: string;
	name: string;
	sub_category: string;
	sub_category_name: string;
	status: string;
	value: number;
	vendor_name: string;
	remarks: string;

	done: boolean;
	is_quotation: boolean;
	is_cs: boolean;
	is_monthly_meeting: boolean;
	is_work_order: boolean;
	is_delivery_statement: boolean;

	cs_remarks: string;
	monthly_meeting_remarks: string;
	work_order_remarks: string;
	delivery_statement_remarks: string;

	quotations: IQuotationTableData[];
	general_notes: IGeneralNotesTableData[];

	created_by_name: string;
	created_at: string;
	updated_at: string;
};

// * Quotation
export type IQuotationTableData = {
	amount: number;
	is_selected: boolean;
	vendor_name: string;
	capital_name: string;
};

// * General Notes
export type IGeneralNotesTableData = {
	amount: number;
	description: string;
	capital_name: string;
	created_at: string;
	updated_at: string;
};
