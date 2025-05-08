// * Service
export type IServiceTableData = {
	id: string;
	uuid: string;
	name: string;
	sub_category: string;
	sub_category_name: string;
	vendor_uuid: string;
	vendor_name: string;
	description: string;
	frequency: string;
	start_date: string;
	end_date: string;
	next_due_date: string;
	cost_per_service: string;
	payment_terms: string;
	status: string;
	approval_required: boolean;
	remarks: string;

	service_payment: IServicePayment[];

	created_at: string;
	updated_at: string;
	created_by_name: string;
};

export type IServicePayment = {
	amount: string;
	payment_date: string;
	created_at: string;
	updated_at: string;
	created_by_name: string;
	remarks: string;
};
