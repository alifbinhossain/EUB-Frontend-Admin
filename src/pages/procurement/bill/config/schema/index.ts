import { request } from 'http';
import { ITEM_WORD_ORDER_SCHEMA } from '@/pages/procurement/item-work-order/config/schema';
import { ITEM_WORK_ORDER_SCHEMA } from '@/pages/procurement/log/config/schema';
import { PROCURE_REQUEST_SCHEMA } from '@/pages/procurement/procure(store)/config/schema';
import { is, it } from 'date-fns/locale';
import { z } from 'zod';

import {
	BOOLEAN_OPTIONAL,
	BOOLEAN_REQUIRED,
	NUMBER_OPTIONAL,
	NUMBER_REQUIRED,
	STRING_ARRAY,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Capital Schema
export const BILL_SCHEMA = z.object({
	vendor_uuid: STRING_REQUIRED,
	// bank_uuid: STRING_REQUIRED,
	is_completed: BOOLEAN_REQUIRED,
	completed_date: STRING_OPTIONAL.nullable(),
	item_work_order: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			total_amount: NUMBER_REQUIRED,
			bill_uuid: STRING_OPTIONAL,
		})
	),
	bill_payment: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			bill_uuid: STRING_OPTIONAL,
			type: z.enum(['partial', 'full']),
			amount: NUMBER_REQUIRED,
			payment_method: z.enum(['cash', 'cheque']),
			payment_date: STRING_OPTIONAL,
		})
	),
});

export const BILL_NULL: Partial<IBill> = {
	vendor_uuid: '',
	is_completed: false,
	completed_date: null,
	// bank_uuid: '',
	bill_payment: [],
};

export type IBill = z.infer<typeof BILL_SCHEMA>;
