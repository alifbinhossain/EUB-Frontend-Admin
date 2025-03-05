import { z } from 'zod';

import { BOOLEAN_REQUIRED, STRING_NULLABLE, STRING_OPTIONAL, STRING_REQUIRED } from '@/utils/validators';

//* Visitor Schema
export const SERVICE_VENDOR_SCHEMA = z.object({
	is_selected: BOOLEAN_REQUIRED,
	service_uuid: STRING_REQUIRED,
	vendor_uuid: STRING_REQUIRED,
	amount: z.number(),
	remarks: STRING_NULLABLE,
});

export const SERVICE_VENDOR_NULL: Partial<IServiceVendor> = {
	is_selected: false,
	service_uuid: '',
	vendor_uuid: '',
	amount: 0,
	remarks: null,
};

export type IServiceVendor = z.infer<typeof SERVICE_VENDOR_SCHEMA>;
