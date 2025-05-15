import { lazy } from 'react';
import { IRoute } from '@/types';

const Visitor = lazy(() => import('@/pages/inquiry/visitor'));
const ContactUs = lazy(() => import('@/pages/inquiry/contact-us'));

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
			{
				name: 'Contact US',
				path: '/inquiry/contact-us',
				element: <ContactUs />,
				page_name: 'inquiry__contact_us',
				actions: ['read', 'update', 'delete'],
			},
		],
	},
];
export default inquiryRoutes;
