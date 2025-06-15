import { z } from 'zod';

import {
	NUMBER_REQUIRED,
	PHONE_NUMBER_OPTIONAL,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Semester Schema
export const SEMESTER_SCHEMA = z.object({
	name: STRING_REQUIRED,
	started_at: STRING_REQUIRED,
	mid_started_at: STRING_REQUIRED,
	final_started_at: STRING_REQUIRED,
	ended_at: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const SEMESTER_NULL: Partial<ISemester> = {
	name: '',
	started_at: '',
	mid_started_at: '',
	final_started_at: '',
	ended_at: '',
	remarks: '',
};

export type ISemester = z.infer<typeof SEMESTER_SCHEMA>;
