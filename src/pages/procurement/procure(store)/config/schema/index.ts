import { request } from 'http';
import { it } from 'date-fns/locale';
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
export const PROCURE_REQUEST_SCHEMA = z
	.object({
		uuid: STRING_OPTIONAL,
		done: BOOLEAN_REQUIRED.default(false),
		done_date: STRING_OPTIONAL.nullable(),
		bill_uuid: STRING_NULLABLE,
		work_order_file: z
			.instanceof(File)
			.refine((file) => file?.size !== 0, 'Please upload an file')
			.or(STRING_NULLABLE),
		delivery_statement_file: z
			.instanceof(File)
			.refine((file) => file?.size !== 0, 'Please upload an file')
			.or(STRING_NULLABLE),

		item_work_order_entry: z.array(
			z.object({
				uuid: STRING_OPTIONAL,
				item_uuid: STRING_OPTIONAL,
				request_quantity: NUMBER_OPTIONAL.refine((val) => val !== undefined && val > 0, {
					message: 'Must be greater than 0',
				}),
				provided_quantity: NUMBER_REQUIRED.min(1, 'Provided Quantity must be greater than 0'),
				unit_price: NUMBER_OPTIONAL,
			})
		),
		work_order_remarks: STRING_NULLABLE,
		vendor_uuid: STRING_REQUIRED,

		is_delivery_statement: BOOLEAN_REQUIRED.default(false),
		delivery_statement_date: STRING_OPTIONAL.nullable(),
		delivery_statement_remarks: STRING_NULLABLE,
	})
	.superRefine((data, ctx) => {
		data?.item_work_order_entry.forEach((item, index) => {
			if (item?.request_quantity && item?.request_quantity < item?.provided_quantity) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Provided Quantity must be less than or equal to Requested Quantity',
					path: [`item_work_order_entry.${index}.provided_quantity`],
				});
			}
			if (data?.is_delivery_statement && (item?.unit_price === undefined || item?.unit_price <= 0)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Unit Price must be greater than 0',
					path: [`item_work_order_entry.${index}.unit_price`],
				});
			}
		});
	});

export const PROCURE_REQUEST_NULL: Partial<IProcureRequest> = {
	done: false,
	done_date: null,
	bill_uuid: null,

	work_order_file: null,
	delivery_statement_file: null,

	item_work_order_entry: [],

	work_order_remarks: null,
	vendor_uuid: '',

	is_delivery_statement: false,
	delivery_statement_date: null,
	delivery_statement_remarks: null,
};

export type IProcureRequest = z.infer<typeof PROCURE_REQUEST_SCHEMA>;
