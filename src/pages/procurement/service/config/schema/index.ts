import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_OPTIONAL,
	NUMBER_REQUIRED,
	PHONE_NUMBER_OPTIONAL,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Service Schema
export const SERVICE_SCHEMA = z.object({
	name: STRING_REQUIRED,
	sub_category_uuid: STRING_REQUIRED,
	done: BOOLEAN_REQUIRED.default(false),

	is_quotation: BOOLEAN_REQUIRED,
	quotations: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			vendor_uuid: STRING_REQUIRED,
			service_uuid: STRING_OPTIONAL,
			amount: NUMBER_REQUIRED.default(0),
			is_selected: BOOLEAN_REQUIRED.default(false),
		})
	),

	is_cs: BOOLEAN_REQUIRED.default(false),
	cs_remarks: STRING_NULLABLE,

	is_monthly_meeting: BOOLEAN_REQUIRED.default(false),
	monthly_meeting_remarks: STRING_NULLABLE,

	is_work_order: BOOLEAN_REQUIRED.default(false),
	work_order_remarks: STRING_NULLABLE,

	is_delivery_statement: BOOLEAN_REQUIRED.default(false),
	delivery_statement_remarks: STRING_NULLABLE,

	general_notes: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			vendor_uuid: STRING_REQUIRED,
			description: STRING_REQUIRED,
			amount: NUMBER_REQUIRED.default(0),
		})
	),
});

export const SERVICE_NULL: Partial<IService> = {
	name: '',
	sub_category_uuid: '',
	done: false,

	is_quotation: false,
	quotations: [
		{
			uuid: '',
			vendor_uuid: '',
			service_uuid: '',
			amount: 0,
			is_selected: false,
		},
	],

	is_cs: false,
	cs_remarks: '',

	is_monthly_meeting: false,
	monthly_meeting_remarks: '',

	is_work_order: false,
	work_order_remarks: '',

	is_delivery_statement: false,
	delivery_statement_remarks: '',

	general_notes: [
		{
			uuid: '',
			vendor_uuid: '',
			description: '',
			amount: 0,
		},
	],
};

export type IService = z.infer<typeof SERVICE_SCHEMA>;
