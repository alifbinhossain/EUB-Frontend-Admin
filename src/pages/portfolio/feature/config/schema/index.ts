import { z } from 'zod';

import { STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

//* Form Schema
export const FEATURE_SCHEMA = z.object({
	index: z.number(),
	is_active: z.boolean(),
	title: STRING_REQUIRED,
	description: STRING_REQUIRED,
	file: z
		.instanceof(File)
		.refine((file) => file?.size !== 0, 'Please upload an image')
		.or(STRING_NULLABLE),
	remarks: STRING_NULLABLE,
});

export const FEATURE_NULL: Partial<IFeature> = {
	index: 0,
	is_active: true,
	title: '',
	description: '',
	file: new File([''], 'filename') as File,
	remarks: '',
};

export type IFeature = z.infer<typeof FEATURE_SCHEMA>;
