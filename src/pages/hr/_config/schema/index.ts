import { z } from 'zod';

import {
	FORTUNE_ZIP_EMAIL_PATTERN,
	PASSWORD,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Department Schema
export const DEPARTMENT_SCHEMA = z.object({
	department: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DEPARTMENT_NULL: Partial<IDepartment> = {
	department: '',
	remarks: null,
};

export type IDepartment = z.infer<typeof DEPARTMENT_SCHEMA>;

//* Designation Schema
export const DESIGNATION_SCHEMA = z.object({
	designation: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DESIGNATION_NULL: Partial<IDesignation> = {
	designation: '',
	remarks: null,
};

export type IDesignation = z.infer<typeof DESIGNATION_SCHEMA>;

//* User Schema
export const USER_SCHEMA = (isUpdate: boolean) => {
	const baseSchema = z.object({
		name: STRING_REQUIRED,
		email: FORTUNE_ZIP_EMAIL_PATTERN,
		user_type: z.enum(['employee', 'customer']),
		department_uuid: STRING_NULLABLE,
		designation_uuid: STRING_NULLABLE,
		ext: STRING_NULLABLE,
		phone: PHONE_NUMBER_REQUIRED,
		remarks: STRING_NULLABLE,
	});

	if (isUpdate) {
		return baseSchema
			.extend({
				pass: STRING_OPTIONAL,
				repeatPass: STRING_OPTIONAL,
			})
			.superRefine((data, ctx) => {
				if (data.user_type === 'employee') {
					if (!data.department_uuid)
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Required',
							path: ['department_uuid'],
						});
					if (!data.designation_uuid)
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Required',
							path: ['designation_uuid'],
						});
				}
			});
	}

	return baseSchema
		.extend({
			pass: PASSWORD,
			repeatPass: PASSWORD,
		})
		.superRefine((data, ctx) => {
			if (data.pass !== data.repeatPass) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Passwords do not match',
					path: ['repeatPass'],
				});
			}
			if (data.user_type === 'employee') {
				if (!data.department_uuid)
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Required',
						path: ['department_uuid'],
					});
				if (!data.designation_uuid)
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Required',
						path: ['designation_uuid'],
					});
			}
		});
};

export const USER_NULL: Partial<IUser> = {
	name: '',
	email: '',
	department_uuid: null,
	user_type: 'employee',
	designation_uuid: null,
	ext: null,
	phone: '',
	remarks: null,
};

export type IUser = z.infer<ReturnType<typeof USER_SCHEMA>>;

//* Reset Password Schema
export const RESET_PASSWORD_SCHEMA = z
	.object({
		pass: PASSWORD,
		repeatPass: PASSWORD,
	})
	.refine((data) => data.pass === data.repeatPass, {
		message: 'Passwords do not match',
		path: ['repeatPass'],
	});

export const RESET_PASSWORD_NULL: Partial<IResetPasswordSchema> = {
	pass: '',
	repeatPass: '',
};

export type IResetPasswordSchema = z.infer<typeof RESET_PASSWORD_SCHEMA>;
