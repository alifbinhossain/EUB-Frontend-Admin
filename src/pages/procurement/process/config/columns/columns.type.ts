// * Process
export type IProcessTableData = {
	id: number;
	uuid: string;
	index: number;
	name: 'quotation' | 'comparative_study' | 'monthly_meeting' | 'work_order' | 'delivery_statement';
	short_name: string;
	items: boolean;
	service: boolean;
	range_1: boolean;
	range_2: boolean;
	range_3: boolean;
	range_4: boolean;
	remarks: string;
};
