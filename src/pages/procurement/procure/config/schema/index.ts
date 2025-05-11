import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Capital Schema
export const CAPITAL_SCHEMA = z
	.object({
		name: STRING_REQUIRED,
		sub_category_uuid: STRING_REQUIRED,
		done: BOOLEAN_REQUIRED.default(false),

		is_quotation: BOOLEAN_REQUIRED,
		quotations: z.array(
			z.object({
				uuid: STRING_OPTIONAL,
				vendor_uuid: STRING_OPTIONAL,
				capital_uuid: STRING_OPTIONAL,
				amount: NUMBER_REQUIRED.default(0),
				is_selected: BOOLEAN_REQUIRED.default(false),
			})
		),

		is_cs: BOOLEAN_REQUIRED.default(false),
		cs_remarks: STRING_NULLABLE,

		is_monthly_meeting: BOOLEAN_REQUIRED.default(false),
		monthly_meeting_remarks: STRING_NULLABLE,

		is_work_order: BOOLEAN_REQUIRED.default(false),
		work_order_remarks: STRING_NULLABLE,
		vendor_uuid: STRING_OPTIONAL.nullable(),

		is_delivery_statement: BOOLEAN_REQUIRED.default(false),
		delivery_statement_remarks: STRING_NULLABLE,

		general_notes: z.array(
			z
				.object({
					uuid: STRING_OPTIONAL,
					capital_uuid: STRING_OPTIONAL,
					description: STRING_OPTIONAL,
					amount: NUMBER_REQUIRED.default(0),
				})
				.refine((note) => note.description, {
					message: 'Required',
					path: ['description'],
				})
		),
	})
	.superRefine((data, ctx) => {
		if (!data.is_quotation) {
			return;
		} else {
			data.quotations.forEach((quotation, index) => {
				if (quotation.vendor_uuid) return;
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Required',
					path: ['quotations', index, 'vendor_uuid'],
				});
			});
		}
	});

export const CAPITAL_NULL: Partial<ICapital> = {
	name: '',
	sub_category_uuid: '',
	done: false,

	is_quotation: false,
	quotations: [],

	is_cs: false,
	cs_remarks: null,

	is_monthly_meeting: false,
	monthly_meeting_remarks: null,

	is_work_order: false,
	work_order_remarks: null,
	vendor_uuid: null,

	is_delivery_statement: false,
	delivery_statement_remarks: null,

	general_notes: [
		// {
		// 	uuid: '',
		// 	vendor_uuid: '',
		// 	description: '',
		// 	amount: 0,
		// },
	],
};

export type ICapital = z.infer<typeof CAPITAL_SCHEMA>;
