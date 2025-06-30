//* Item Requisition
export type IItemRequisitionTableData = {
	uuid: string;
	item_uuid: string;
	item_name: string;
	requisition_name: string;
	req_quantity: number;
	provided_quantity: number;
	prev_provided_quantity: number;
	created_by_name: string;
	prev_provided_date: string;
};
// * Requisition
export type IRequisitionTableData = {
	uuid: string;
	id: number;
	requisition_id: string;
	is_received: boolean;
	is_store_received: boolean;
	pi_generated_number: number;
	store_received_date: string;
	received_date: string;
	created_at: string;
	created_by_name: string;
	updated_at: string;
	designation: string;

	department:
		| 'chairman_bot'
		| 'vice_chancellor'
		| 'treasurer'
		| 'pni'
		| 'pnd'
		| 'civil_engineering'
		| 'admission_office'
		| 'controller_office'
		| 'exam_c_01'
		| 'exam_c_02'
		| 'account_c_01'
		| 'account_c_02'
		| 'cse'
		| 'registrar(hod)'
		| 'additional_registrar'
		| 'additional_registrar_c_01'
		| 'additional_registrar_c_02'
		| 'english'
		| 'businessadministration'
		| 'library '
		| 'ipe&_iqac'
		| 'textile_engineering'
		| 'proctor_office'
		| 'eee'
		| 'fde'
		| 'medical_centre'
		| 'economics'
		| 'mdgs'
		| 'thm'
		| 'mathematics'
		| 'pcu'
		| 'program_coordination_manager'
		| 'program_coordination_asst_manager'
		| 'sr_program_coordination_incharge'
		| 'physics'
		| 'chemistry'
		| 'security_director'
		| 'logistics'
		| 'reception_gate'
		| 'ict'
		| 'law';
	item_requisition: IItemRequisitionTableData[];
	remarks: string;
};
