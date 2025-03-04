import { lazy } from 'react';
import { IRoute } from '@/types';

const Category = lazy(() => import('@/pages/procurement/category'));
const Process = lazy(() => import('@/pages/procurement/process'));

const procurementRoutes: IRoute[] = [
	{
		name: 'Procurement',
		children: [
			{
				name: 'Category',
				path: '/procurement/category',
				element: <Category />,
				page_name: 'procurement__category',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Process',
				path: '/procurement/process',
				element: <Process />,
				page_name: 'procurement__process',
				actions: [
					'create',
					'read',
					'delete',
					'click_items',
					'click_service',
					'click_range_1',
					'click_range_2',
					'click_range_3',
					'click_range_4',
				],
			},
		],
	},
];
export default procurementRoutes;
