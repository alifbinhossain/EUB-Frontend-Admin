import { lazy } from 'react';
import { IRoute } from '@/types';

const Authorities = lazy(() => import('@/pages/portfollo/authorities'));
const CertificatesCourseFee = lazy(() => import('@/pages/portfollo/certificate-course-fee'));
const Department = lazy(() => import('@/pages/portfollo/department'));
const Faculty = lazy(() => import('@/pages/portfollo/faculty'));
const Club = lazy(() => import('@/pages/portfollo/club'));
const Program = lazy(() => import('@/pages/portfollo/program'));
const TuitionFee = lazy(() => import('@/pages/portfollo/tuittion-fee'));
const DepartmentTeachers = lazy(() => import('@/pages/portfollo/department-teacher'));
const News = lazy(() => import('@/pages/portfollo/news'));
const NewsEntry = lazy(() => import('@/pages/portfollo/news/entry'));

const Bot = lazy(() => import('@/pages/portfollo/bot'));
const Office = lazy(() => import('@/pages/portfollo/office'));
const OfficeDetails = lazy(() => import('@/pages/portfollo/office/details'));
const OfficeEntry = lazy(() => import('@/pages/portfollo/office/add-or-update'));
const FinancialInformation = lazy(() => import('@/pages/portfollo/financial-info'));
const Info = lazy(() => import('@/pages/portfollo/info'));
const Routine = lazy(() => import('@/pages/portfollo/routine'));
const JobCircular = lazy(() => import('@/pages/portfollo/job-circular'));

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
			{
				name: 'Club',
				path: '/portfolio/club',
				element: <Club />,
				page_name: 'portfolio__club',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Department Teachers',
				path: '/portfolio/department-teacher',
				element: <DepartmentTeachers />,
				page_name: 'portfolio__department_teachers',
				actions: ['create', 'read', 'update', 'delete'],
			},
			// ? NEWS
			{
				name: 'News',
				path: '/portfolio/news',
				element: <News />,
				page_name: 'portfolio__news',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'News Entry',
				path: '/portfolio/news/entry',
				element: <NewsEntry />,
				page_name: 'portfolio__news_entry',
				actions: ['create', 'read', 'update', 'delete'],
				hidden: true,
			},
			{
				name: 'News Entry Update',
				path: '/portfolio/news/entry/:uuid/update',
				element: <NewsEntry />,
				page_name: 'portfolio__news_entry_update',
				actions: ['create', 'read', 'update', 'delete'],
				hidden: true,
			},
			{
				name: 'Bot',
				path: '/portfolio/bot',
				element: <Bot />,
				page_name: 'portfolio__bot',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Office',
				path: '/portfolio/office',
				element: <Office />,
				page_name: 'portfolio__office',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Office Entry',
				path: 'portfolio/office/create',
				element: <OfficeEntry />,
				hidden: true,
				page_name: 'portfolio__office_create',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Office Details',
				path: 'portfolio/office/:uuid/details',
				element: <OfficeDetails />,
				hidden: true,
				page_name: 'portfolio__office_details',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Office Update',
				path: 'portfolio/office/:uuid/update',
				element: <OfficeEntry />,
				hidden: true,
				page_name: 'portfolio__office_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Financial Information',
				path: 'portfolio/financial-information',
				element: <FinancialInformation />,
				page_name: 'portfolio__financial_information',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Info',
				path: '/portfolio/info',
				element: <Info />,
				page_name: 'portfolio__info',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Routine',
				path: '/portfolio/routine',
				element: <Routine />,
				page_name: 'portfolio__routine',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Job Circular',
				path: '/portfolio/job-circular',
				element: <JobCircular />,
				page_name: 'portfolio__job_circular',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default portfolioRoutes;
