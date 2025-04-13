import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_REQUIRED,
	PHONE_NUMBER_OPTIONAL,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Requisition Schema
export const REQUISITION_SCHEMA = z
	.object({
		internal_cost_center_uuid: STRING_REQUIRED,
		is_received: BOOLEAN_REQUIRED.default(false),
		received_date: STRING_OPTIONAL,
		department: z.enum([
			'chairman_bot',
			'vice_chancellor',
			'treasurer',
			'pni',
			'pnd',
			'civil_engineering',
			'admission_office',
			'controller_office',
			'exam_c_01',
			'exam_c_02',
			'account_c_01',
			'account_c_02',
			'cse',
			'registrar(hod)',
			'additional_registrar',
			'additional_registrar_c_01',
			'additional_registrar_c_02',
			'english',
			'businessadministration',
			'library ',
			'ipe&_iqac',
			'textile_engineering',
			'proctor_office',
			'eee',
			'fde',
			'medical_centre',
			'economics',
			'mdgs',
			'thm',
			'mathematics ',
			'pcu',
			'program_coordination_manager',
			'program_coordination_asst_manager',
			'sr_program_coordination_incharge',
			'physics',
			'chemistry',
			'security_director',
			'logistics',
			'reception_gate',
			'ict',
			'law',
		]),
		remarks: STRING_NULLABLE,
		item_requisition: z.array(
			z.object({
				uuid: STRING_OPTIONAL,
				requisition_uuid: STRING_OPTIONAL,
				item_uuid: STRING_REQUIRED,
				req_quantity: NUMBER_REQUIRED.min(1, 'Must be greater than 0'),
				provided_quantity: NUMBER_REQUIRED,
				remarks: STRING_NULLABLE,
			})
		),
	})
	.superRefine((data, ctx) => {
		if (data.is_received && !data.received_date) {
			ctx.addIssue({
				code: 'custom',
				message: 'Received Date is required',
			});
		}
	});

export const REQUISITION_NULL: Partial<IRequisition> = {
	internal_cost_center_uuid: '',
	is_received: false,
	received_date: '',
	department: undefined,
	remarks: '',
	item_requisition: [],
};

export type IRequisition = z.infer<typeof REQUISITION_SCHEMA>;
