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

// * Bank Schema
export const BANK_SCHEMA = z.object({
	name: STRING_REQUIRED,
	swift_code: STRING_REQUIRED,
	address: STRING_REQUIRED,
	routing_no: STRING_REQUIRED,
	account_no: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const BANK_NULL: Partial<IBank> = {
	name: '',
	swift_code: '',
	address: '',
	routing_no: '',
	account_no: '',
	remarks: null,
};

export type IBank = z.infer<typeof BANK_SCHEMA>;
