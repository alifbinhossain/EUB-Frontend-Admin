import { lazy } from 'react';
import BulkQr from '@/pages/fde/bulk-qr';
import Form from '@/pages/fde/form';
import FormEntry from '@/pages/fde/form/entry';
import List from '@/pages/fde/list';
import Log from '@/pages/fde/log';
import Question from '@/pages/fde/question';
import QuestionCategory from '@/pages/fde/question-category';
import ReportDepartmentEvaluationSemester from '@/pages/fde/report/department-evaluation-semester';
import ReportTeacherEvaluation from '@/pages/fde/report/teacher-evaluation-semester';
import ReportTeacherEvaluationTeacher from '@/pages/fde/report/teacher-evaluation-teacher';
import { IRoute } from '@/types';

const fdeRoutes: IRoute[] = [
	{
		name: 'FDE',
		children: [
			{
				name: 'Question Category',
				path: '/fde/question-category',
				element: <QuestionCategory />,
				page_name: 'fde__question_category',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Question',
				path: '/fde/question',
				element: <Question />,
				page_name: 'fde__question',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Submission',
				path: '/fde/submission',
				element: <Form />,
				page_name: 'fde__submission',
				actions: ['create', 'read', 'update', 'delete', 'show_student_ID'],
			},
			{
				name: 'Form Entry',
				path: '/fde/form/entry',
				element: <FormEntry />,
				hidden: true,
				page_name: 'fde__form_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Form Update',
				path: '/fde/:sem_crs_thr_entry_uuid/:evaluation_time/:uuid/update',
				element: <FormEntry />,
				hidden: true,
				page_name: 'fde__form_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Evaluation',
				path: '/fde/evaluation',
				element: <List />,
				page_name: 'fde__evaluation',
				actions: ['create', 'read', 'update', 'delete', 'show_all_teacher'],
			},
			{
				name: 'Bulk QR',
				path: '/fde/bulk-qr',
				element: <BulkQr />,
				page_name: 'fde__fde__bulk_qr',
				actions: ['create', 'read', 'update', 'delete', 'show_all_teacher'],
			},
			{
				name: 'Log',
				path: '/fde/log',
				element: <Log />,
				page_name: 'fde__log',
				actions: ['create', 'read', 'update', 'delete', 'show_student_ID'],
			},
			{
				name: 'Report',
				children: [
					{
						name: 'Teacher Evaluation (Semester)',
						path: '/fde/report/teacher-evaluation',
						element: <ReportTeacherEvaluation />,
						page_name: 'fde__report_teacher_evaluation_semester',
						actions: ['read'],
					},
					{
						name: 'Teacher Evaluation (Teacher)',
						path: '/fde/report/teacher-evaluation-teacher',
						element: <ReportTeacherEvaluationTeacher />,
						page_name: 'fde__report_teacher_evaluation_teacher',
						actions: ['read'],
					},
					{
						name: 'Department Evaluation (Semester)',
						path: '/fde/report/department-evaluation',
						element: <ReportDepartmentEvaluationSemester />,
						page_name: 'fde__report_department_evaluation_semester',
						actions: ['read'],
					},
				],
			},
		],
	},
];
export default fdeRoutes;
