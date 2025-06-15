import { lazy } from 'react';
import Question from '@/pages/fde/question';
import QuestionCategory from '@/pages/fde/question-category';
import { IRoute } from '@/types';

const fdeRoutes: IRoute[] = [
	{
		name: 'FDE',
		children: [
			{
				name: 'Question Category',
				path: '/fde/question-category',
				element: <QuestionCategory />,
				page_name: 'fde__question_category',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Question',
				path: '/fde/question',
				element: <Question />,
				page_name: 'fde__question',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default fdeRoutes;
