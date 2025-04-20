import { add } from 'lodash';
import { z } from 'zod';

import { STRING_NULLABLE, STRING_OPTIONAL, STRING_REQUIRED } from '@/utils/validators';

//* Item Transfer Schema
export const ITEM_TRANSFER_SCHEMA = z.object({
	is_requisition_received: z.boolean().default(false),
	item_uuid: STRING_OPTIONAL,
	quantity: z.number().int().positive(),
	reason: z.enum(['emergency']),
	remarks: STRING_NULLABLE,
});
export const ITEM_TRANSFER_NULL: Partial<IItemTransfer> = {
	is_requisition_received: false,
	item_uuid: undefined,
	quantity: 0,
	reason: 'emergency',
	remarks: '',
};
export type IItemTransfer = z.infer<typeof ITEM_TRANSFER_SCHEMA>;
