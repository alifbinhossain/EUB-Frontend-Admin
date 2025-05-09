import { it } from 'node:test';
import { z } from 'zod';

import { BOOLEAN_REQUIRED, NUMBER_REQUIRED, STRING_REQUIRED } from '@/utils/validators';

// Sub Category Schema
export const GENERAL_STATEMENT_SCHEMA = z.object({
	general_note: STRING_REQUIRED,
	sign_1: BOOLEAN_REQUIRED,
});

export const GENERAL_STATEMENT_NULL: Partial<IGeneralStatement> = {
	general_note: '',
	sign_1: false,
};
export type IGeneralStatement = z.infer<typeof GENERAL_STATEMENT_SCHEMA>;
export const WORK_ORDER_SCHEMA = z.object({
	employee_designation: STRING_REQUIRED,
	vendor_company_name: STRING_REQUIRED,
	vendor_address: STRING_REQUIRED,
	employee_contact_number: STRING_REQUIRED,
	subject: STRING_REQUIRED,
	body_opening: STRING_REQUIRED,
	product: z.array(
		z.object({
			product_name: STRING_REQUIRED,
			description: STRING_REQUIRED,
			quantity: NUMBER_REQUIRED.gt(0),
			unit_price: NUMBER_REQUIRED.gt(0),
			total_price: NUMBER_REQUIRED.gt(0),
		})
	),
	payment: z.array(
		z.object({
			condition: STRING_REQUIRED,
		})
	),
	grand_total: NUMBER_REQUIRED.gt(0),
	in_words: STRING_REQUIRED,
	body_ending: STRING_REQUIRED,
	completion_date: STRING_REQUIRED,
});

export const WORK_ORDER_NULL: Partial<IWorkOrder> = {
	employee_designation: '',
	vendor_company_name: '',
	vendor_address: '',
	employee_contact_number: '',
	body_opening: '',
	product: [
		{
			product_name: '',
			description: '',
			quantity: 0,
			unit_price: 0,
			total_price: 0,
		},
	],
	payment: [
		{
			condition: '',
		},
	],
	grand_total: 0,
	in_words: '',
	body_ending: '',
	completion_date: '',
};

export type IWorkOrder = z.infer<typeof WORK_ORDER_SCHEMA>;
export const ITEM_REQUISITION_SCHEMA = z.object({
	uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	designation: STRING_REQUIRED,
	department: STRING_REQUIRED,
	remarks: STRING_REQUIRED,
	item_requisition: z.array(
		z.object({
			item: STRING_REQUIRED,
			quantity: NUMBER_REQUIRED.gt(0),
		})
	),
});

export const ITEM_REQUISITION_NULL: Partial<ItemRequisition> = {
	uuid: '',
	name: '',
	designation: '',
	department: '',
	remarks: '',
	item_requisition: [
		{
			item: '',
			quantity: 0,
		},
	],
};

export type ItemRequisition = z.infer<typeof ITEM_REQUISITION_SCHEMA>;
export const COMPARATIVE_SCHEMA = z.object({
	uuid: STRING_REQUIRED,
	description: STRING_REQUIRED,
	vendors: z.array(
		z.object({
			name: STRING_REQUIRED,
			quantity: NUMBER_REQUIRED.gt(0),
			price: NUMBER_REQUIRED.gt(0),
		})
	),
});

export const COMPARATIVE_NULL: Partial<IComparative> = {
	uuid: '',
	description: '',
	vendors: [
		{
			name: '',
			quantity: 0,
			price: 0,
		},
	],
};

export type IComparative = z.infer<typeof COMPARATIVE_SCHEMA>;
