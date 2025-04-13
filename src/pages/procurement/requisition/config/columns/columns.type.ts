// * Requisition
export type IRequisitionTableData = {
	uuid: string;
	id: number;
	internal_cost_center_uuid: string;
	internal_cost_center_name: string;
	is_received: boolean;
	received_date: string;
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
	remarks: string;
};
