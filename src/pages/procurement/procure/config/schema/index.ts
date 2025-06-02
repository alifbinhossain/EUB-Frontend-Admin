import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_OPTIONAL,
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
		done_date: STRING_OPTIONAL.nullable(),

		quotation_file: z
			.instanceof(File)
			.refine((file) => file?.size !== 0, 'Please upload an file')
			.or(STRING_NULLABLE),
		cs_file: z
			.instanceof(File)
			.refine((file) => file?.size !== 0, 'Please upload an file')
			.or(STRING_NULLABLE),
		monthly_meeting_file: z
			.instanceof(File)
			.refine((file) => file?.size !== 0, 'Please upload an file')
			.or(STRING_NULLABLE),
		work_order_file: z
			.instanceof(File)
			.refine((file) => file?.size !== 0, 'Please upload an file')
			.or(STRING_NULLABLE),
		delivery_statement_file: z
			.instanceof(File)
			.refine((file) => file?.size !== 0, 'Please upload an file')
			.or(STRING_NULLABLE),

		is_quotation: BOOLEAN_REQUIRED,
		quotation_date: STRING_OPTIONAL.nullable(),
		quotations: z.array(
			z.object({
				uuid: STRING_OPTIONAL,
				vendor_uuid: STRING_OPTIONAL,
				capital_uuid: STRING_OPTIONAL,
				amount: NUMBER_REQUIRED.default(0),
				is_selected: BOOLEAN_REQUIRED.default(false),
			})
		),

		items: z.array(
			z.object({
				uuid: STRING_OPTIONAL,
				item_uuid: STRING_OPTIONAL,
				quantity: NUMBER_OPTIONAL.refine((val) => val !== undefined && val > 0, {
					message: 'Must be greater than 0',
				}),
				unit_price: NUMBER_OPTIONAL,
				is_received: BOOLEAN_REQUIRED.default(false),
				received_date: STRING_NULLABLE,
			})
		),

		is_cs: BOOLEAN_REQUIRED.default(false),
		cs_date: STRING_OPTIONAL.nullable(),
		cs_remarks: STRING_NULLABLE,

		is_monthly_meeting: BOOLEAN_REQUIRED.default(false),
		monthly_meeting_date: STRING_OPTIONAL.nullable(),
		monthly_meeting_schedule_date: STRING_OPTIONAL.nullable(),
		monthly_meeting_remarks: STRING_NULLABLE,

		is_work_order: BOOLEAN_REQUIRED.default(false),
		work_order_date: STRING_OPTIONAL.nullable(),
		work_order_remarks: STRING_NULLABLE,
		vendor_uuid: STRING_OPTIONAL.nullable(),

		is_delivery_statement: BOOLEAN_REQUIRED.default(false),
		delivery_statement_date: STRING_OPTIONAL.nullable(),
		delivery_statement_remarks: STRING_NULLABLE,

		general_notes: z.array(
			z
				.object({
					uuid: STRING_OPTIONAL,
					capital_uuid: STRING_OPTIONAL,
					description: STRING_OPTIONAL,
					general_note_file: z
						.instanceof(File)
						.refine((file) => file?.size !== 0, 'Please upload an file')
						.or(STRING_NULLABLE),
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
	done_date: '',

	quotation_file: null,
	cs_file: null,
	monthly_meeting_file: null,
	work_order_file: null,
	delivery_statement_file: null,

	is_quotation: false,
	quotation_date: '',
	quotations: [],

	items: [],

	is_cs: false,
	cs_date: '',
	cs_remarks: '',

	is_monthly_meeting: false,
	monthly_meeting_date: '',
	monthly_meeting_remarks: '',

	is_work_order: false,
	work_order_date: '',
	monthly_meeting_schedule_date: '',
	work_order_remarks: '',
	vendor_uuid: '',

	is_delivery_statement: false,
	delivery_statement_date: '',
	delivery_statement_remarks: '',

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
