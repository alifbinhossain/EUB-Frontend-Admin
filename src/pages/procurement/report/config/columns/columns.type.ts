// * ReportItem
export type IReportItemTableData = {
	item_name: string;
	opening_quantity: number;
	received_quantity: number;
	consumption_quantity: number;
	closing_quantity: number;
	created_at: string;
	created_by: string;
	updated_at: string;
	created_by_name: string;
};

//* Pipeline
export type IPipelineTableData = {
	item_name: string;
	item_uuid: string;
	req_quantity: string;
	provided_quantity: string;
};
