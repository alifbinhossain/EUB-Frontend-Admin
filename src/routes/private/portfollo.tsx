import { lazy } from 'react';
import { IRoute } from '@/types';

import { DepartmentAccess, InfoAccess } from './utils';

const Authorities = lazy(() => import('@/pages/portfolio/authorities'));

const Department = lazy(() => import('@/pages/portfolio/department'));
const Faculty = lazy(() => import('@/pages/portfolio/faculty'));
const Club = lazy(() => import('@/pages/portfolio/useful-links/club'));
const Program = lazy(() => import('@/pages/portfolio/program'));

const Teachers = lazy(() => import('@/pages/portfolio/teacher'));
const UpdateTeacher = lazy(() => import('@/pages/portfolio/teacher/add-or-update'));
const News = lazy(() => import('@/pages/portfolio/useful-links/news'));
const NewsEntry = lazy(() => import('@/pages/portfolio/useful-links/news/entry'));

const BoardOfTrustees = lazy(() => import('@/pages/portfolio/boardOfTrustees'));
const Office = lazy(() => import('@/pages/portfolio/office'));
const OfficeDetails = lazy(() => import('@/pages/portfolio/office/details'));
const OfficeEntry = lazy(() => import('@/pages/portfolio/office/add-or-update'));

const Info = lazy(() => import('@/pages/portfolio/info'));
const Routine = lazy(() => import('@/pages/portfolio/routine'));
const JobCircular = lazy(() => import('@/pages/portfolio/useful-links/job-circular'));

const Offers = lazy(() => import('@/pages/portfolio/offers'));
const Policy = lazy(() => import('@/pages/portfolio/useful-links/policy'));

const Tender = lazy(() => import('@/pages/portfolio/useful-links/tender'));
const CertificatesCourseFee = lazy(() => import('@/pages/portfolio/admission/certificate-course-fee'));
const TuitionFee = lazy(() => import('@/pages/portfolio/admission/tuition-fee'));
const FinancialInformation = lazy(() => import('@/pages/portfolio/admission/financial-info'));
const Admission = lazy(() => import('@/pages/portfolio/admission/online-form'));
const AdmissionDetails = lazy(() => import('@/pages/portfolio/admission/online-form/details'));
const AdmissionEntry = lazy(() => import('@/pages/portfolio/admission/online-form/add-or-update'));

const portfolioRoutes: IRoute[] = [
	{
		name: 'Portfolio',
		children: [
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
				name: 'Info',
				path: '/portfolio/info',
				element: <Info />,
				page_name: 'portfolio__info',
				actions: ['create', 'read', 'update', 'delete', ...InfoAccess],
			},
			{
				name: 'Offers',
				path: '/portfolio/offers',
				element: <Offers />,
				page_name: 'portfolio__offers',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Programs',
				children: [
					{
						name: 'Teachers',
						path: '/portfolio/teacher',
						element: <Teachers />,
						page_name: 'portfolio__teachers',
						actions: ['create', 'read', 'update', 'delete', ...DepartmentAccess],
					},
					{
						name: 'Teachers',
						path: '/portfolio/teacher/:uuid/update',
						element: <UpdateTeacher />,
						hidden: true,
						page_name: 'portfolio__teachers',
						actions: ['create', 'read', 'update', 'delete', ...DepartmentAccess],
					},

					{
						name: 'Routine',
						path: '/portfolio/routine',
						element: <Routine />,
						page_name: 'portfolio__routine',
						actions: ['create', 'read', 'update', 'delete', ...DepartmentAccess],
					},
				],
			},
			{
				name: 'Office and Authorities',
				children: [
					{
						name: 'Authorities',
						path: '/portfolio/authorities',
						element: <Authorities />,
						page_name: 'portfolio__authorities',
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
						name: 'Board Of Trustees',
						path: '/portfolio/bot',
						element: <BoardOfTrustees />,
						page_name: 'portfolio__bot',
						actions: ['create', 'read', 'update', 'delete'],
					},
				],
			},
			{
				name: 'Admission',
				children: [
					{
						name: 'Online Form',
						path: '/admission/online-form',
						element: <Admission />,
						page_name: 'admission__online_form',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Online Form Entry',
						path: '/admission/online-form/create',
						element: <AdmissionEntry />,
						hidden: true,
						page_name: 'admission__online_form_create',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Online Form Details',
						path: '/admission/online-form/:uuid/details',
						element: <AdmissionDetails />,
						hidden: true,
						page_name: 'admission__online_form_details',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Admission Update',
						path: 'admission/online-form/:uuid/update',
						element: <AdmissionEntry />,
						hidden: true,
						page_name: 'admission__admission_update',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Certificates Course Fee',
						path: '/admission/certificates-course-fee',
						element: <CertificatesCourseFee />,
						page_name: 'admission__certificates_course_fee',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Financial Information',
						path: '/admission/financial-information',
						element: <FinancialInformation />,
						page_name: 'admission__financial_information',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Tuition Fee',
						path: '/admission/tuition-fee',
						element: <TuitionFee />,
						page_name: 'admission__tuition_fee',
						actions: ['create', 'read', 'update', 'delete'],
					},
				],
			},
			{
				name: 'Useful Links',
				children: [
					{
						name: 'News',
						path: '/portfolio/news',
						element: <News />,
						page_name: 'portfolio__news',
						actions: ['create', 'read', 'update', 'delete', ...DepartmentAccess],
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
						name: 'Club',
						path: '/portfolio/club',
						element: <Club />,
						page_name: 'portfolio__club',
						actions: ['create', 'read', 'update', 'delete', 'extra-curricular-club', ...DepartmentAccess],
					},
					{
						name: 'Tender',
						path: '/portfolio/tender',
						element: <Tender />,
						page_name: 'portfolio__tender',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Policy',
						path: '/portfolio/policy',
						element: <Policy />,
						page_name: 'portfolio__policy',
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
		],
	},
];
export default portfolioRoutes;
