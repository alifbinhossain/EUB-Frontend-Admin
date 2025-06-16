import { Search } from 'lucide-react';
import { z } from 'zod';

import {
	NUMBER_OPTIONAL,
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

export const COURSE_SCHEMA = z.object({
	name: STRING_REQUIRED,
	code: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
	course_section: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			course_uuid: STRING_OPTIONAL,
			name: STRING_REQUIRED,
		})
	),
});

export const COURSE_NULL: Partial<ICourse> = {
	name: '',
	code: '',
	remarks: '',
	course_section: [
		{
			uuid: '',
			course_uuid: '',
			name: '',
		},
	],
};

export type ICourse = z.infer<typeof COURSE_SCHEMA>;

export const COURSE_ASSIGN_SCHEMA = z.object({
	course_uuid: STRING_OPTIONAL,

	sem_crs_thr_entry: z.array(
		z
			.object({
				uuid: STRING_OPTIONAL,
				semester_uuid: STRING_OPTIONAL,
				course_section_uuid: STRING_OPTIONAL,
				teachers_uuid: STRING_OPTIONAL,
				class_size: NUMBER_OPTIONAL.default(0),
			})
			.superRefine((val, ctx) => {
				if (val.teachers_uuid && (!val.class_size || val.class_size <= 0)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Value must be greater than 0',
						path: ['class_size'],
					});
				}
				if (!val.teachers_uuid && val.class_size > 0) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Required',
						path: ['teachers_uuid'],
					});
				}
			})
	),
});

export const COURSE_ASSIGN_NULL: Partial<ICourseAssign> = {
	course_uuid: '',
	sem_crs_thr_entry: [],
};
export type ICourseAssign = z.infer<typeof COURSE_ASSIGN_SCHEMA>;
