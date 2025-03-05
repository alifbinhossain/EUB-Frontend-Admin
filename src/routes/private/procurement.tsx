import { lazy } from 'react';
import { IRoute } from '@/types';

const Category = lazy(() => import('@/pages/procurement/category'));
const Process = lazy(() => import('@/pages/procurement/process'));
const Vendor = lazy(() => import('@/pages/procurement/vendor'));
const GeneralNote = lazy(() => import('@/pages/procurement/general-note'));
const ServiceVendor = lazy(() => import('@/pages/procurement/service-vendor'));

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
			{
				name: 'Vendor',
				path: '/procurement/vendor',
				element: <Vendor />,
				page_name: 'procurement__vendor',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'General Note',
				path: '/procurement/general-note',
				element: <GeneralNote />,
				page_name: 'procurement__general_note',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Service Vendor',
				path: '/procurement/service-vendor',
				element: <ServiceVendor />,
				page_name: 'procurement__service_vendor',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default procurementRoutes;
