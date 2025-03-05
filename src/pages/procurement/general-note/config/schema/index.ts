import { z } from 'zod';

import { STRING_NULLABLE, STRING_OPTIONAL, STRING_REQUIRED } from '@/utils/validators';

//* Visitor Schema
export const GENERAL_NOTE_SCHEMA = z.object({
	service_uuid: STRING_REQUIRED,
	description: STRING_REQUIRED,
	amount: z.number(),
	remarks: STRING_NULLABLE,
});

export const GENERAL_NOTE_NULL: Partial<IGeneralNote> = {
	service_uuid: '',
	description: '',
	remarks: null,
};

export type IGeneralNote = z.infer<typeof GENERAL_NOTE_SCHEMA>;
