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
const ItemWorkOrderDetails = lazy(() => import('@/pages/procurement/item-work-order/details'));
const Form = lazy(() => import('@/pages/procurement/form'));
const Capital = lazy(() => import('@/pages/procurement/capital'));
const CapitalEntry = lazy(() => import('@/pages/procurement/capital/entry'));
const CapitalDetails = lazy(() => import('@/pages/procurement/capital/details'));
const Service = lazy(() => import('@/pages/procurement/service'));
const ServiceEntry = lazy(() => import('@/pages/procurement/service/entry'));
const ServiceDetails = lazy(() => import('@/pages/procurement/service/details'));
const InternalCostCenter = lazy(() => import('@/pages/procurement/internal-cost-center'));
const Requisition = lazy(() => import('@/pages/procurement/requisition'));
const RequisitionEntry = lazy(() => import('@/pages/procurement/requisition/entry'));
const RequisitionProvided = lazy(() => import('@/pages/procurement/requisition/provided'));
const Log = lazy(() => import('@/pages/procurement/log'));
const ReportItem = lazy(() => import('@/pages/procurement/report/item/index'));
const GeneralStatement = lazy(() => import('@/pages/procurement/general-statment/index'));

const procurementRoutes: IRoute[] = [
	{
		name: 'Procurement',
		children: [
			// ? Capital
			{
				name: 'Capital',
				path: '/procurement/capital',
				element: <Capital />,
				page_name: 'procurement__capital',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Capital Entry',
				path: '/procurement/capital/create',
				element: <CapitalEntry />,
				hidden: true,
				page_name: 'procurement__capital_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Capital Update',
				path: '/procurement/capital/:uuid/update',
				element: <CapitalEntry />,
				hidden: true,
				page_name: 'procurement__capital_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Capital Details',
				path: '/procurement/capital-details/:uuid',
				element: <CapitalDetails />,
				hidden: true,
				page_name: 'procurement__capital_details',
				actions: ['read'],
			},

			// ? Service
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
				name: 'Service Details',
				path: '/procurement/service-details/:uuid',
				element: <ServiceDetails />,
				hidden: true,
				page_name: 'procurement__service_details',
				actions: ['read'],
			},

			// ? Item Work Order
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
				name: 'Item Work Order Details',
				path: '/procurement/item-work-order-details/:uuid',
				element: <ItemWorkOrderDetails />,
				hidden: true,
				page_name: 'procurement__item_work_order_details',
				actions: ['read'],
			},

			// ? Item Work Order Details
			{
				name: 'Item',
				path: '/procurement/item',
				element: <Item />,
				page_name: 'procurement__item',
				actions: ['create', 'read', 'update', 'delete', 'click_item_trx'],
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
				name: 'Form',
				path: '/procurement/form',
				element: <Form />,
				page_name: 'procurement__form',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Requisition',
				path: '/procurement/requisition',
				element: <Requisition />,
				page_name: 'procurement__requisition',
				actions: [
					'create',
					'read',
					'update',
					'delete',
					'click_provided',
					'show_all',
					'click_received',
					'click_received_override',
					'click_store_received_override',
					'click_store_received',
				],
			},
			{
				name: 'Requisition Entry',
				path: '/procurement/requisition/create',
				element: <RequisitionEntry />,
				hidden: true,
				page_name: 'procurement__requisition_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Requisition Provided',
				path: '/procurement/requisition/:uuid/provided',
				element: <RequisitionProvided />,
				hidden: true,
				page_name: 'procurement__requisition_provided',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Requisition Update',
				path: '/procurement/requisition/:uuid/update',
				element: <RequisitionEntry />,
				hidden: true,
				page_name: 'procurement__requisition_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Report',
				children: [
					{
						name: 'Item',
						path: '/portfolio/report/item',
						element: <ReportItem />,
						page_name: 'portfolio__report_item',
						actions: ['read'],
					},
				],
			},
			{
				name: 'PDF Generate',
				path: '/procurement/pdf/generate',
				element: <GeneralStatement />,
				page_name: 'procurement__pdf_generate',
				actions: ['read'],
			},
			{
				name: 'Log',
				path: '/procurement/log',
				element: <Log />,
				page_name: 'procurement__log',
				actions: ['read', 'update', 'delete'],
			},

			{
				name: 'Library',
				children: [
					{
						name: 'Internal Cost Center',
						path: '/procurement/internal-cost-center',
						element: <InternalCostCenter />,
						page_name: 'procurement__internal_cost_center',
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
		],
	},
];
export default procurementRoutes;
