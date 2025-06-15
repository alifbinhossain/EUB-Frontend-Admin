import { lazy } from 'react';
import { IRoute } from '@/types';

const Semester = lazy(() => import('@/pages/fde/lib/semester'));

const fdeRoutes: IRoute[] = [
	{
		name: 'FDE',
		children: [
			{
				name: 'Semester',
				path: '/procurement/lib/semester',
				element: <Semester />,
				page_name: 'faculty_development_evaluation__semester',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default fdeRoutes;
