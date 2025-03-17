import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Purchase Return Log
export const TRANSFER_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	office_uuid: STRING_OPTIONAL,
	user_uuid: STRING_REQUIRED,
	user_email: STRING_REQUIRED,
	user_phone: STRING_NULLABLE,
	designation: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const TRANSFER_NULL: Partial<ITransfer> = {
	uuid: '',
	office_uuid: '',
	user_uuid: '',
	user_email: '',
	user_phone: '',
	designation: '',
	remarks: '',
};

export type ITransfer = z.infer<typeof TRANSFER_SCHEMA>;
