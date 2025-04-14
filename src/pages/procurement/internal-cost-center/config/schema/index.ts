import { z } from 'zod';

import { BOOLEAN_REQUIRED, NUMBER_REQUIRED, STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

// * Internal Cost Center Schema
export const INTERNAL_COST_CENTER_SCHEMA = z.object({
	name: STRING_REQUIRED,
	authorized_person_uuid: STRING_REQUIRED,
	from: STRING_REQUIRED,
	to: STRING_REQUIRED,
	type: z.enum(['proctor', 'admission', 'exam-control', 'fed', 'purchase_committee']),
	budget: NUMBER_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const INTERNAL_COST_CENTER_NULL: Partial<IInternalCostCenter> = {
	name: '',
	authorized_person_uuid: '',
	from: '',
	to: '',
	type: undefined,
	budget: 0,
	remarks: '',
};

export type IInternalCostCenter = z.infer<typeof INTERNAL_COST_CENTER_SCHEMA>;
