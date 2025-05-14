import { add } from 'lodash';
import { z } from 'zod';

import { PHONE_NUMBER_REQUIRED, STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

//* Visitor Schema
export const VENDOR_SCHEMA = z.object({
	name: STRING_REQUIRED,
	phone: PHONE_NUMBER_REQUIRED,
	product_type: STRING_REQUIRED,
	address: STRING_REQUIRED,
	purpose: STRING_REQUIRED,
	starting_date: STRING_REQUIRED,
	ending_date: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const VENDOR_NULL: Partial<IVendor> = {
	name: '',
	phone: '',
	product_type: '',
	address: '',
	purpose: '',
	starting_date: '',
	ending_date: '',
	remarks: null,
};

export type IVendor = z.infer<typeof VENDOR_SCHEMA>;
