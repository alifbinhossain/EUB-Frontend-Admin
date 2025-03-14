// * ServiceVendorTableData
export type IServiceVendorTableData = {
	uuid: string;
	service_uuid: string;
	service_name: string;
	vendor_uuid: string;
	vendor_name: string;
	description: string;
	amount: number;
	is_selected: boolean;
	remarks: string;
};
