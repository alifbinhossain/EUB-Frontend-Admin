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

//* Room Schema
export const ROOM_SCHEMA = z.object({
	name: STRING_REQUIRED,
	capacity: NUMBER_REQUIRED,
	type: z.enum(['general', 'lab']),
	location: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const ROOM_NULL: Partial<IRoom> = {
	name: '',
	capacity: 0,
	type: 'general',
	location: null,
	remarks: null,
};

export type IRoom = z.infer<typeof ROOM_SCHEMA>;
export const ROOM_ALLOCATION_SCHEMA = z.object({
	sem_crs_thr_entry_uuid: STRING_REQUIRED,
});
export const ROOM_ALLOCATION_NULL: Partial<IRoomAllocation> = {
	sem_crs_thr_entry_uuid: '',
};
export type IRoomAllocation = z.infer<typeof ROOM_ALLOCATION_SCHEMA>;

//* Course Schema
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

export const TEACHER_ROOM_ALLOCATION_PDF_SCHEMA = z.object({
	teachers_uuid: STRING_REQUIRED,
});
export const TEACHER_ROOM_ALLOCATION_PDF_NULL: Partial<IRoomAllocationTeacherPDF> = {
	teachers_uuid: '',
};
export type IRoomAllocationTeacherPDF = z.infer<typeof TEACHER_ROOM_ALLOCATION_PDF_SCHEMA>;
