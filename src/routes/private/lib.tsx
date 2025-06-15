import { lazy } from 'react';
import { IRoute } from '@/types';

const Semester = lazy(() => import('@/pages/lib/semester'));
const Course = lazy(() => import('@/pages/lib/course'));

const fdeRoutes: IRoute[] = [
	{
		name: 'Library',
		children: [
			{
				name: 'Semester',
				path: '/lib/semester',
				element: <Semester />,
				page_name: 'library__semester',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Course',
				path: '/lib/course',
				element: <Course />,
				page_name: 'library__course',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default fdeRoutes;
