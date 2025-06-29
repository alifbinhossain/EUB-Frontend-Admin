import { z } from 'zod';

import { STRING_NULLABLE, STRING_OPTIONAL } from '@/utils/validators';

//* Item Transfer Schema
export const ITEM_TRANSFER_SCHEMA = z.object({
	is_requisition_received: z.boolean().default(false),
	item_uuid: STRING_OPTIONAL,
	quantity: z.number().int().positive(),
	reason: z.enum(['emergency']),
	remarks: STRING_NULLABLE,
});
export const ITEM_TRANSFER_NULL: Partial<IItemTransfer> = {
	is_requisition_received: false,
	item_uuid: undefined,
	quantity: 0,
	reason: 'emergency',
	remarks: '',
};
export type IItemTransfer = z.infer<typeof ITEM_TRANSFER_SCHEMA>;

//* Item Work Order Entry Schema
export const ITEM_WORK_ORDER_SCHEMA = z.object({
	is_received: z.boolean().default(false),
	item_work_order_uuid: STRING_OPTIONAL,
	item_uuid: STRING_OPTIONAL,
	quantity: z.number().int().positive(),
	unit_price: z.number().positive(),
	received_date: z.date().optional(),
	remarks: STRING_NULLABLE,
});
export const ITEM_WORK_ORDER_NULL: Partial<IItemWorkOrder> = {
	is_received: false,
	item_work_order_uuid: undefined,
	item_uuid: undefined,
	quantity: 0,
	unit_price: 0,
	received_date: undefined,
	remarks: '',
};
export type IItemWorkOrder = z.infer<typeof ITEM_WORK_ORDER_SCHEMA>;

//* Item Requisition Schema
export const ITEM_REQUISITION_SCHEMA = z.object({
	item_uuid: STRING_OPTIONAL,
	requisition_uuid: STRING_OPTIONAL,
	req_quantity: z.number().int().positive(),
	provided_quantity: z.number().int().positive(),
	remarks: STRING_NULLABLE,
});
export const ITEM_REQUISITION_NULL: Partial<IItemRequisition> = {
	item_uuid: undefined,
	requisition_uuid: undefined,
	req_quantity: 0,
	provided_quantity: 0,
	remarks: '',
};
export type IItemRequisition = z.infer<typeof ITEM_REQUISITION_SCHEMA>;

export const REQUEST_SCHEMA = z.object({
	item_uuid: STRING_OPTIONAL,
	request_quantity: z.number().int().positive(),
	remarks: STRING_NULLABLE,
});
export const REQUEST_NULL: Partial<IRequest> = {
	item_uuid: undefined,
	request_quantity: 0,
	remarks: '',
};
export type IRequest = z.infer<typeof REQUEST_SCHEMA>;
