import { TRANSFER_SCHEMA } from '@/pages/portfolio/office/add-or-update/_config/schema';
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
	store: STRING_REQUIRED,
	purchase_cost_center_uuid: STRING_REQUIRED,
	sub_purchase_cost_center_uuid: STRING_NULLABLE,
	threshold: NUMBER_REQUIRED.min(1, 'Threshold must be greater than 0'),
	lead_time: NUMBER_REQUIRED.min(1, 'Lead Time must be greater than 0'),
	// vendor_price: NUMBER_REQUIRED.min(1, 'Vendor Price must be greater than 0'),
	unit: STRING_REQUIRED,
	// price_validity: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
	vendors: z.array(
		z.object({ uuid: STRING_OPTIONAL, vendor_uuid: STRING_REQUIRED, is_active: BOOLEAN_REQUIRED.default(false) })
	),
});

export const ITEM_NULL: Partial<IItem> = {
	name: '',
	purchase_cost_center_uuid: '',
	sub_purchase_cost_center_uuid: null,
	threshold: 0,
	lead_time: 0,
	// vendor_price: 0,
	unit: '',
	// price_validity: '',
	remarks: '',
	vendors: [],
};

export type IItem = z.infer<typeof ITEM_SCHEMA>;

export const ITEM_TRANSFER_SCHEMA = z.object({
	item_uuid: STRING_OPTIONAL,
	quantity: z.number().int().positive(),
	reason: z.enum(['emergency']),
	remarks: STRING_NULLABLE,
});
export const ITEM_TRANSFER_NULL: Partial<IItemTransfer> = {
	item_uuid: undefined,
	quantity: 0,
	reason: 'emergency',
	remarks: '',
};
export type IItemTransfer = z.infer<typeof ITEM_TRANSFER_SCHEMA>;

export const REQUEST_SCHEMA = z.object({
	item_uuid: STRING_OPTIONAL,
	request_quantity: z.number().int().positive(),
	reason: z.enum(['emergency']),
	remarks: STRING_NULLABLE,
});
export const REQUEST_NULL: Partial<IRequest> = {
	item_uuid: undefined,
	request_quantity: 0,
	reason: 'emergency',
	remarks: '',
};
export type IRequest = z.infer<typeof REQUEST_SCHEMA>;
