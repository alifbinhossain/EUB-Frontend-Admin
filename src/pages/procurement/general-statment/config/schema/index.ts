import { z } from 'zod';

import { BOOLEAN_REQUIRED, STRING_REQUIRED } from '@/utils/validators';

// Sub Category Schema
export const GENERAL_STATEMENT_SCHEMA = z.object({
	general_note: STRING_REQUIRED,
	sign_1: BOOLEAN_REQUIRED,
});

export const GENERAL_STATEMENT_NULL: Partial<IGeneralStatement> = {
	general_note: '',
	sign_1: false,
};

export type IGeneralStatement = z.infer<typeof GENERAL_STATEMENT_SCHEMA>;
