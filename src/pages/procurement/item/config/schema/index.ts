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

// Item Schema
export const ITEM_SCHEMA = z.object({
	name: STRING_REQUIRED,
	purchase_cost_center_uuid: STRING_REQUIRED,
	vendor_price: NUMBER_REQUIRED.min(1, 'Vendor Price must be greater than 0'),
	unit: STRING_REQUIRED,
	price_validity: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
	vendors: z.array(
		z.object({ uuid: STRING_OPTIONAL, vendor_uuid: STRING_REQUIRED, is_active: BOOLEAN_REQUIRED.default(false) })
	),
});

export const ITEM_NULL: Partial<IItem> = {
	name: '',
	purchase_cost_center_uuid: '',
	vendor_price: 0,
	unit: '',
	price_validity: '',
	remarks: '',
	vendors: [
		{
			uuid: '',
			vendor_uuid: '',
			is_active: false,
		},
	],
};

export type IItem = z.infer<typeof ITEM_SCHEMA>;
