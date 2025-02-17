import { lazy } from 'react';
import { IRoute } from '@/types';

const Visitor = lazy(() => import('@/pages/inquiry/visitor'));

const inquiryRoutes: IRoute[] = [
	{
		name: 'Inquiry',
		children: [
			{
				name: 'Visitor',
				path: '/inquiry/visitor',
				element: <Visitor />,
				page_name: 'inquiry__visitor',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default inquiryRoutes;
