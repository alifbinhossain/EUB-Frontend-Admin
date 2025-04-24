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

// Item Schema
export const ITEM_WORD_ORDER_SCHEMA = z.object({
	vendor_uuid: STRING_REQUIRED,
	status: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
	item_work_order_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			item_uuid: STRING_REQUIRED,
			quantity: NUMBER_REQUIRED.min(1, 'Must be greater than 0'),
			unit_price: NUMBER_OPTIONAL,
			is_received: BOOLEAN_REQUIRED.default(false),
			received_date: STRING_NULLABLE,
		})
	),
});

export const ITEM_WORD_ORDER_NULL: Partial<IItemWorkOrder> = {
	vendor_uuid: '',
	status: '',
	remarks: '',
	item_work_order_entry: [
		{
			uuid: '',
			item_uuid: '',
			quantity: 0,
			unit_price: 0,
			is_received: false,
			received_date: null,
		},
	],
};

export type IItemWorkOrder = z.infer<typeof ITEM_WORD_ORDER_SCHEMA>;
