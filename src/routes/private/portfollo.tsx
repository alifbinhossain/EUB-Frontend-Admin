import { lazy } from 'react';
import { IRoute } from '@/types';

const Authorities = lazy(() => import('@/pages/portfollo/authorities'));
const CertificatesCourseFee = lazy(() => import('@/pages/portfollo/certificate-course-fee'));
const Department = lazy(() => import('@/pages/portfollo/department'));
const Faculty = lazy(() => import('@/pages/portfollo/faculty'));
const Program = lazy(() => import('@/pages/portfollo/program'));
const TuitionFee = lazy(() => import('@/pages/portfollo/tuittion-fee'));
const portfolioRoutes: IRoute[] = [
	{
		name: 'Portfolio',
		children: [
			{
				name: 'Authorities',
				path: '/portfolio/authorities',
				element: <Authorities />,
				page_name: 'portfolio__authorities',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Certificates Course Fee',
				path: '/portfolio/certificates-course-fee',
				element: <CertificatesCourseFee />,
				page_name: 'portfolio__certificates_course_fee',
				hidden: true,
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Department',
				path: '/portfolio/department',
				element: <Department />,
				page_name: 'portfolio__department',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Faculty',
				path: '/portfolio/faculty',
				element: <Faculty />,
				page_name: 'portfolio__faculty',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Program',
				path: '/portfolio/program',
				element: <Program />,
				page_name: 'portfolio__program',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Tuition Fee',
				path: '/portfolio/tuition-fee',
				element: <TuitionFee />,
				page_name: 'portfolio__tuition_fee',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default portfolioRoutes;
