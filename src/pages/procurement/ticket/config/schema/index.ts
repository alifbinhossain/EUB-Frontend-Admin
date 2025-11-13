import { z } from 'zod';

import { BOOLEAN_REQUIRED, NUMBER_REQUIRED, STRING_OPTIONAL, STRING_REQUIRED } from '@/utils/validators';

// Ticket Schema
export const TICKET_SCHEMA = z.object({
	is_resolved: BOOLEAN_REQUIRED.default(false),
	department: STRING_REQUIRED,
	problem_description: STRING_REQUIRED,
	req_ticket_item: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			req_ticket_uuid: STRING_OPTIONAL,
			item_uuid: STRING_REQUIRED,
			quantity: NUMBER_REQUIRED.default(0),
		})
	),
});

export const TICKET_NULL: Partial<ITicket> = {
	is_resolved: false,
	department: '',
	problem_description: '',
	req_ticket_item: [],
};

export type ITicket = z.infer<typeof TICKET_SCHEMA>;
