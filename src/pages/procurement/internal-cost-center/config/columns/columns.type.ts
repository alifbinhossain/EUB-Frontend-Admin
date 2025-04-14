// * Internal Cost Center
export type IInternalCostCenterTableData = {
	uuid: string;
	type: 'proctor' | 'admission' | 'exam_control' | 'fed' | 'purchase_committee';
	authorized_person_uuid: string;
	name: string;
	from: string;
	to: string;
	budget: number;
	remarks: string;
};
