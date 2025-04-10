import { z } from 'zod';

import { STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

//* Form Schema
export const FORM_SCHEMA = z.object({
	name: STRING_REQUIRED,
	file: z
		.instanceof(File)
		.refine((file) => file?.size !== 0, 'Please upload an file')
		.or(STRING_REQUIRED),
	remarks: STRING_NULLABLE,
});

export const FORM_NULL: Partial<IForm> = {
	name: '',
	file: new File([''], 'filename') as File,
	remarks: '',
};

export type IForm = z.infer<typeof FORM_SCHEMA>;
