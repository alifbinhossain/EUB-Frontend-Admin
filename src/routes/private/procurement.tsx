import { lazy } from 'react';
import { IRoute } from '@/types';

const Category = lazy(() => import('@/pages/procurement/category'));
const SubCategory = lazy(() => import('@/pages/procurement/subcategory'));
const PurchaseCostCenter = lazy(() => import('@/pages/procurement/purchaseCostCenter'));
const Item = lazy(() => import('@/pages/procurement/item'));
const ItemEntry = lazy(() => import('@/pages/procurement/item/entry'));
const Process = lazy(() => import('@/pages/procurement/process'));
const Vendor = lazy(() => import('@/pages/procurement/vendor'));
const ItemWorkOrder = lazy(() => import('@/pages/procurement/item-work-order'));
const ItemWorkOrderEntry = lazy(() => import('@/pages/procurement/item-work-order/entry'));
const Service = lazy(() => import('@/pages/procurement/service'));
const ServiceEntry = lazy(() => import('@/pages/procurement/service/entry'));

const procurementRoutes: IRoute[] = [
	{
		name: 'Procurement',
		children: [
			{
				name: 'Service',
				path: '/procurement/service',
				element: <Service />,
				page_name: 'procurement__service',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Service Entry',
				path: '/procurement/service/create',
				element: <ServiceEntry />,
				hidden: true,
				page_name: 'procurement__service_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Service Update',
				path: '/procurement/service/:uuid/update',
				element: <ServiceEntry />,
				hidden: true,
				page_name: 'procurement__service_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Item Work Order',
				path: '/procurement/item-work-order',
				element: <ItemWorkOrder />,
				page_name: 'procurement__item_work_order',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Item Work Order Entry',
				path: '/procurement/item-work-order/create',
				element: <ItemWorkOrderEntry />,
				hidden: true,
				page_name: 'procurement__item_work_order_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Item Work Order Update',
				path: '/procurement/item-work-order/:uuid/update',
				element: <ItemWorkOrderEntry />,
				hidden: true,
				page_name: 'procurement__item_work_order_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Item',
				path: '/procurement/item',
				element: <Item />,
				page_name: 'procurement__item',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Item Entry',
				path: '/procurement/item/create',
				element: <ItemEntry />,
				hidden: true,
				page_name: 'procurement__item_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Item Update',
				path: '/procurement/item/:uuid/update',
				element: <ItemEntry />,
				hidden: true,
				page_name: 'procurement__item_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Purchase Cost Center',
				path: '/procurement/purchase-cost-center',
				element: <PurchaseCostCenter />,
				page_name: 'procurement__purchase_cost_center',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Sub Category',
				path: '/procurement/subcategory',
				element: <SubCategory />,
				page_name: 'procurement__subcategory',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Category',
				path: '/procurement/category',
				element: <Category />,
				page_name: 'procurement__category',
				actions: ['create', 'read', 'update', 'delete'],
			},

			{
				name: 'Vendor',
				path: '/procurement/vendor',
				element: <Vendor />,
				page_name: 'procurement__vendor',
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
		],
	},
];
export default procurementRoutes;
