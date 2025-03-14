import { z } from 'zod';

import {
	NUMBER_REQUIRED,
	PHONE_NUMBER_OPTIONAL,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Sub Category Schema
export const SUB_CATEGORY_SCHEMA = z.object({
	index: NUMBER_REQUIRED,
	name: STRING_REQUIRED,
	category_uuid: STRING_REQUIRED,
	type: STRING_REQUIRED,
	min_amount: NUMBER_REQUIRED.min(1, 'Must be greater than 0'),
	min_quotation: NUMBER_REQUIRED.min(1, 'Must be greater than 0'),
	remarks: STRING_NULLABLE,
});

export const SUB_CATEGORY_NULL: Partial<ISubCategory> = {
	index: 0,
	name: '',
	category_uuid: '',
	type: '',
	min_amount: 0,
	min_quotation: 0,
	remarks: '',
};

export type ISubCategory = z.infer<typeof SUB_CATEGORY_SCHEMA>;
