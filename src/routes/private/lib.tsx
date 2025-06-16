import { lazy } from 'react';
import { IRoute } from '@/types';

const Semester = lazy(() => import('@/pages/lib/semester'));
const Course = lazy(() => import('@/pages/lib/course'));
const CourseEntry = lazy(() => import('@/pages/lib/course/entry'));

const CourseAssign = lazy(() => import('@/pages/lib/course-assign'));
const CourseAssignEntry = lazy(() => import('@/pages/lib/course-assign/entry'));

const fdeRoutes: IRoute[] = [
	{
		name: 'Library',
		children: [
			{
				name: 'Semester',
				path: '/lib/semester',
				element: <Semester />,
				page_name: 'library__semester',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Course',
				path: '/lib/course',
				element: <Course />,
				page_name: 'library__course',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Course Create',
				path: '/lib/course/create',
				element: <CourseEntry />,
				hidden: true,
				page_name: 'library__course_create',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Course Update',
				path: '/lib/course/:uuid/update',
				element: <CourseEntry />,
				hidden: true,
				page_name: 'library__course_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Course Assign',
				path: '/lib/course-assign',
				element: <CourseAssign />,
				page_name: 'library__course_assign',
				actions: ['create', 'read', 'update'],
			},
			{
				name: 'Course Assign Create',
				path: '/lib/course-assign/:uuid/create',
				element: <CourseAssignEntry />,
				hidden: true,
				page_name: 'library__course_assign_create',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default fdeRoutes;
