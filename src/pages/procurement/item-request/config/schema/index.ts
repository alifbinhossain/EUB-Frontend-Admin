import { z } from 'zod';

import { STRING_NULLABLE, STRING_OPTIONAL } from '@/utils/validators';

//* REQUEST
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
