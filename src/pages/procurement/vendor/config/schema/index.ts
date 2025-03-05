import { z } from 'zod';

import { STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

//* Visitor Schema
export const VENDOR_SCHEMA = z.object({
	name: STRING_REQUIRED,
	phone: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const VENDOR_NULL: Partial<IVendor> = {
	name: '',
	phone: '',
	remarks: null,
};

export type IVendor = z.infer<typeof VENDOR_SCHEMA>;
