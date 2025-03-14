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

// * Category Schema
export const CATEGORY_SCHEMA = z.object({
	index: NUMBER_REQUIRED.min(1, 'Must be greater than 0'),
	name: STRING_REQUIRED,
	is_capital: BOOLEAN_REQUIRED.default(false),
	remarks: STRING_NULLABLE,
});

export const CATEGORY_NULL: Partial<ICategory> = {
	index: 0,
	name: '',
	is_capital: false,
	remarks: '',
};

export type ICategory = z.infer<typeof CATEGORY_SCHEMA>;
