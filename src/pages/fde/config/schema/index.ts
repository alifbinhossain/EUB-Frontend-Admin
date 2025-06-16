import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_REQUIRED,
	PHONE_NUMBER_OPTIONAL,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Question Category Schema
export const QUESTION_CATEGORY_SCHEMA = z.object({
	index: NUMBER_REQUIRED,
	name: STRING_REQUIRED,
	min_percentage: NUMBER_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const QUESTION_CATEGORY_NULL: Partial<IQuestionCategory> = {
	index: 0,
	name: '',
	min_percentage: 0,
	remarks: '',
};

export type IQuestionCategory = z.infer<typeof QUESTION_CATEGORY_SCHEMA>;

//* Question Schema
export const QUESTION_SCHEMA = z.object({
	index: NUMBER_REQUIRED,
	qns_category_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	active: BOOLEAN_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const QUESTION_NULL: Partial<IQuestion> = {
	index: 0,
	qns_category_uuid: '',
	name: '',
	active: true,
	remarks: '',
};

export type IQuestion = z.infer<typeof QUESTION_SCHEMA>;
//*Form Schema

export const FORM_SCHEMA = z.object({
	id: STRING_REQUIRED,
	qns: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			qns_uuid: STRING_OPTIONAL,
			qns_category_uuid: STRING_REQUIRED,
			rating: NUMBER_REQUIRED,
		})
	),
	remarks: STRING_NULLABLE,
});

export const FORM_NULL: Partial<IForm> = {
	id: '',
	qns: [],
	remarks: null,
};
export type IForm = z.infer<typeof FORM_SCHEMA>;
