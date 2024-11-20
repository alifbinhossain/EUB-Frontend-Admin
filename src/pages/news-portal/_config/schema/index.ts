import { z } from 'zod';

import {
	DATE_REQUIRED,
	IMAGE_FILE,
	JSON_STRING_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

export const NEWS_PORTAL_SCHEMA = z.object({
	title: STRING_REQUIRED,
	subtitle: STRING_OPTIONAL,
	description: STRING_REQUIRED,
	content: JSON_STRING_REQUIRED,
	documents: z.array(IMAGE_FILE.or(z.object({ uuid: STRING_REQUIRED, type: STRING_REQUIRED, url: STRING_REQUIRED }))),
	cover_image: IMAGE_FILE.or(STRING_OPTIONAL),
	published_date: DATE_REQUIRED,
	remarks: STRING_NULLABLE,
});
export const NEWS_PORTAL_NULL: Partial<INews_Portal> = {};
export type INews_Portal = z.infer<typeof NEWS_PORTAL_SCHEMA>;
