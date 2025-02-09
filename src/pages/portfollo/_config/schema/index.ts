import { z } from 'zod';

import { STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

//* Department Schema
export const DEPARTMENT_SCHEMA = z.object({
	name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DEPARTMENT_NULL: Partial<IDepartment> = {
	name: '',
	remarks: null,
};

export type IDepartment = z.infer<typeof DEPARTMENT_SCHEMA>;

//* Bot Schema
export const BOT_SCHEMA = z.object({
	category: STRING_REQUIRED,
	user_uuid: STRING_REQUIRED,
	status: STRING_REQUIRED,
	description: STRING_REQUIRED,
	file: z.instanceof(File).refine((file) => file?.size !== 0, 'Please upload an file'),
	remarks: STRING_NULLABLE,
});

export const BOT_NULL: Partial<IBot> = {
	category: '',
	user_uuid: '',
	status: '',
	description: '',
	file: new File([''], 'filename') as File,
	remarks: null,
};

export type IBot = z.infer<typeof BOT_SCHEMA>;
