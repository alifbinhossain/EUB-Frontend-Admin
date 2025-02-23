import { lazy } from 'react';
import { IRoute } from '@/types';

const CertificatesCourseFee = lazy(() => import('@/pages/admission/certificate-course-fee'));
const TuitionFee = lazy(() => import('@/pages/admission/tuition-fee'));
const FinancialInformation = lazy(() => import('@/pages/admission/financial-info'));
const Admission = lazy(() => import('@/pages/admission/online-form'));
const AdmissionDetails = lazy(() => import('@/pages/admission/online-form/details'));
const AdmissionEntry = lazy(() => import('@/pages/admission/online-form/add-or-update'));
const admissionRoutes: IRoute[] = [
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
];
export default admissionRoutes;
