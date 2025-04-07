// * Service
export type IServiceTableData = {
	id: string;
	uuid: string;
	name: string;
	sub_category: string;
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
};
