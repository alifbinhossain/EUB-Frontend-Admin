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
	start_date: string | Date;
	end_date: string | Date;
	next_due_date: string | Date;
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
	amount: number;
	payment_date: string;
	created_at?: string;
	updated_at?: string;
	created_by_name?: string;
	next_due_date: string | Date;
	remarks: string;
};
