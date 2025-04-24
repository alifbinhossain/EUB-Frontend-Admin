import { z } from 'zod';

import {
	NUMBER_REQUIRED,
	PHONE_NUMBER_OPTIONAL,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Purchase Cost Center Schema
export const PURCHASE_COST_CENTER_SCHEMA = z.object({
	name: STRING_REQUIRED,
	sub_category_uuid: STRING_REQUIRED,
	from: STRING_REQUIRED,
	to: STRING_REQUIRED,
	budget: NUMBER_REQUIRED.min(1, 'Budget must be greater than 0'),
	remarks: STRING_NULLABLE,
});

export const PURCHASE_COST_CENTER_NULL: Partial<IPurchaseCostCenter> = {
	name: '',
	sub_category_uuid: '',
	from: '',
	to: '',
	budget: 0,
	remarks: '',
};

export type IPurchaseCostCenter = z.infer<typeof PURCHASE_COST_CENTER_SCHEMA>;
