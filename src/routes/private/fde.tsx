import { lazy } from 'react';
import Form from '@/pages/fde/form';
import FormEntry from '@/pages/fde/form/entry';
import List from '@/pages/fde/list';
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
			{
				name: 'Form',
				path: '/fde/form',
				element: <Form />,
				page_name: 'fde__form',
				actions: ['create', 'read', 'update', 'delete', 'show_student_ID'],
			},
			{
				name: 'Form Entry',
				path: '/fde/form/entry',
				element: <FormEntry />,
				hidden: true,
				page_name: 'fde__form_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Form Update',
				path: '/fde/:sem_crs_thr_entry_uuid/:evaluation_time/:uuid/update',
				element: <FormEntry />,
				hidden: true,
				page_name: 'fde__form_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Evaluation',
				path: '/fde/list',
				element: <List />,
				page_name: 'fde__list',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default fdeRoutes;
