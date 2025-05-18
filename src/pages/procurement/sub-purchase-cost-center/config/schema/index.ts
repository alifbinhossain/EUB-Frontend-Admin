import { z } from 'zod';

import { STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

// Purchase Cost Center Schema
export const SUB_PURCHASE_COST_CENTER_SCHEMA = z.object({
	name: STRING_REQUIRED,
	purchase_cost_center_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const SUB_PURCHASE_COST_CENTER_NULL: Partial<ISubPurchaseCostCenter> = {
	name: '',
	purchase_cost_center_uuid: '',
	remarks: '',
};

export type ISubPurchaseCostCenter = z.infer<typeof SUB_PURCHASE_COST_CENTER_SCHEMA>;
