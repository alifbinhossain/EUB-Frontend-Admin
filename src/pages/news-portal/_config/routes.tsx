import { lazy } from 'react';
import { IRoute } from '@/types';

const NewsPortal = lazy(() => import('@/pages/news-portal/default'));

const NewsPortalRoutes: IRoute[] = [
	{
		path: '/news-portal',
		name: 'News Portal',
		element: <NewsPortal />,
		page_name: 'news_portal',
		actions: ['read', 'create', 'update', 'delete'],
	},
];

export default NewsPortalRoutes;
