import { z } from 'zod';

import { BOOLEAN_REQUIRED, NUMBER_REQUIRED, STRING_OPTIONAL, STRING_REQUIRED } from '@/utils/validators';

// Service Schema
export const SERVICE_SCHEMA = z.object({
	name: STRING_REQUIRED,
	sub_category_uuid: STRING_REQUIRED,
	vendor_uuid: STRING_REQUIRED,
	description: STRING_OPTIONAL,
	frequency: STRING_REQUIRED,
	start_date: STRING_REQUIRED,
	end_date: STRING_REQUIRED,
	next_due_date: STRING_REQUIRED,
	cost_per_service: NUMBER_REQUIRED.default(0),
	payment_terms: STRING_REQUIRED,
	status: STRING_REQUIRED,
	approval_required: BOOLEAN_REQUIRED.default(false),

	service_payment: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			service_uuid: STRING_OPTIONAL,
			amount: NUMBER_REQUIRED.default(0),
			payment_date: STRING_REQUIRED,
		})
	),
});

export const SERVICE_NULL: Partial<IService> = {
	name: '',
	sub_category_uuid: '',
	vendor_uuid: '',
	description: '',
	frequency: '',
	start_date: '',
	end_date: '',
	next_due_date: '',
	cost_per_service: 0,
	payment_terms: '',
	status: 'pending',
	approval_required: false,
	service_payment: [],
};

export type IService = z.infer<typeof SERVICE_SCHEMA>;
