// * Vendor
export type IVendorTableData = {
	id: number;
	uuid: string;
	name: string;
	phone: string;
	remarks: string;
};
//* Item
export type IItemTableData = {
	id: number;
	uuid: string;
	name: string;
	vendor_price: number;
	unit: string;
	remarks: string;
};
