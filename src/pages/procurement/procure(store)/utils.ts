export const status = [
	{ value: 'pending', label: 'Pending' },
	{ value: 'accept', label: 'Accept' },
	{ value: 'reject', label: 'Reject' },
];
export interface ICustomItemSelectOptions {
	label: string;
	value: number | string;
	request_quantity: number;
	unit: string;
	item_uuid: string;
}
