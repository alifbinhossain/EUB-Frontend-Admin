import { ColumnDef, Row } from '@tanstack/react-table';
import { Link } from 'lucide-react';

import { CustomLink, LinkOnly, LinkWithRedirect } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import {
	IFDEListTableData,
	IQuestionCategoryTableData,
	IQuestionTableData,
	IReportDepartmentEvaluationSemesterTableData,
	IReportTeacherEvaluationTableData,
	IReportTeacherEvaluationTeacherTableData,
	IRespondingStudentTableData,
} from './columns.type';

// * Question Category Columns
export const questionCategoryColumns = (): ColumnDef<IQuestionCategoryTableData>[] => [
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
];

//*FDE Question
export const questionColumns = ({
	handleActive,
}: {
	handleActive: (row: Row<any>) => void;
}): ColumnDef<IQuestionTableData>[] => [
	{
		accessorKey: 'active',
		header: 'Active',
		enableColumnFilter: true,
		cell: (info) => <Switch checked={info.getValue() as boolean} onCheckedChange={() => handleActive(info.row)} />,
	},
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: true,
		size: 20,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'qns_category_name',
		header: 'Question Category',
		enableColumnFilter: true,
		size: 20,
	},
];

//* Responding Student
export const respondingStudentColumns = ({
	showStudentID,
}: {
	showStudentID?: boolean;
}): ColumnDef<IRespondingStudentTableData>[] => [
	{
		accessorKey: 'id',
		header: 'Student ID',
		enableColumnFilter: true,
		meta: {
			hidden: !showStudentID,
		},
	},
	{
		accessorKey: 'semester_name',
		header: 'Semester',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'teacher_name',
		header: 'Teacher',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'course_name',
		header: 'Course',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'course_section_name',
		header: 'Section',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'evaluation_time',
		header: 'Evaluation Time',
		enableColumnFilter: true,
	},
];

//*FDE List
export const fdeListColumns = ({
	handleMidEvolution,
	handleFinalEvolution,
}: {
	handleMidEvolution: (row: Row<IFDEListTableData>) => void;
	handleFinalEvolution: (row: Row<IFDEListTableData>) => void;
}): ColumnDef<IFDEListTableData>[] => [
	{
		accessorKey: 'semester_name',
		header: 'Semester',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'teacher_name',
		header: 'Teacher',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'course_name',
		header: 'Course',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'course_section_name',
		header: 'Section',
		enableColumnFilter: true,
	},

	{
		accessorKey: 'class_size',
		header: 'Class Size',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'is_mid_evaluation_complete',
		header: 'MID Evaluation',
		enableColumnFilter: true,
		cell: (info) => (
			<div className='flex flex-col'>
				<Switch checked={info.getValue() as boolean} onCheckedChange={() => handleMidEvolution(info.row)} />
				<span>{info.row.original.mid_evaluation_response + '/' + info.row.original.class_size}</span>
			</div>
		),
	},
	{
		accessorKey: 'mid_evolution_link',
		header: 'Mid Link',
		enableColumnFilter: true,
		cell: (info) => {
			if (info.row.original.is_mid_evaluation_complete) return <span>Completed</span>;
			const fullURL = window.location.href;
			const slice = fullURL.split('f');
			const baseURl = slice[0];
			const link = `${baseURl}fde/${info.row.original.uuid}/mid`;
			return <LinkWithRedirect title={'Link'} uri={link} baseUrlNeeded={false} showCopyButton={true} />;
		},
	},
	{
		accessorKey: 'is_final_evaluation_complete',
		header: 'Final Evaluation',
		enableColumnFilter: true,
		cell: (info) => (
			<div className='flex flex-col'>
				<Switch
					checked={info.getValue() as boolean}
					onCheckedChange={() => handleFinalEvolution(info.row)}
					disabled={!info.row.original.is_mid_evaluation_complete}
				/>
				<span>{info.row.original.final_evaluation_response + '/' + info.row.original.class_size}</span>
			</div>
		),
	},

	{
		accessorKey: 'final_evolution_link',
		header: 'Final Link',
		enableColumnFilter: true,
		cell: (info) => {
			if (info.row.original.is_final_evaluation_complete) return <span>Completed</span>;
			else if (!info.row.original.is_mid_evaluation_complete) return <span>MID Evaluation is not completed</span>;
			const fullURL = window.location.href;
			const slice = fullURL.split('f');
			const baseURl = slice[0];
			const link = `${baseURl}fde/${info.row.original.uuid}/final`;
			return <LinkWithRedirect title={'Link'} uri={link} baseUrlNeeded={false} showCopyButton={true} />;
		},
	},
];

//* Responding Student
export const respondingStudentLogColumns = ({
	showStudentID,
}: {
	showStudentID?: boolean;
}): ColumnDef<IRespondingStudentTableData>[] => [
	{
		accessorKey: 'id',
		header: 'Student ID',
		enableColumnFilter: true,
		meta: {
			hidden: !showStudentID,
		},
	},
	{
		accessorKey: 'semester_name',
		header: 'Semester',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'teacher_name',
		header: 'Teacher',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'course_name',
		header: 'Course',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'course_section_name',
		header: 'Section',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'evaluation_time',
		header: 'Evaluation Time',
		enableColumnFilter: true,
	},
];

// ? Report
//* Teacher Evaluation
export const teacherEvaluationColumns = (): ColumnDef<IReportTeacherEvaluationTableData>[] => [
	{
		accessorKey: 'semester_name',
		header: 'Semester',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'teacher_name',
		header: 'Teacher',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'department_name',
		header: 'Department',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'appointment_date',
		header: () => (
			<>
				Appointment <br /> Date
			</>
		),
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'performance_key',
		header: 'Performance Key',
		enableColumnFilter: false,
		columns: [
			{
				accessorKey: 'performance_key.organization_of_the_lessons',
				header: () => (
					<>
						Organization Of <br /> The Lessons
					</>
				),
				enableColumnFilter: true,
			},
			{
				accessorKey: 'performance_key.interpretation_of_teaching_materials',
				header: () => (
					<>
						Interpretation Of <br /> Teaching Materials
					</>
				),
				enableColumnFilter: true,
			},
			{
				accessorKey: 'performance_key.presentation_of_teaching_materials',
				header: () => (
					<>
						Presentation Of <br /> Teaching Materials
					</>
				),
				enableColumnFilter: true,
			},
			{
				accessorKey: 'performance_key.interpersonal_discussion_inside_the_classroom',
				header: () => (
					<>
						Interpersonal Discussion <br /> Inside The Classroom
					</>
				),
				enableColumnFilter: true,
			},
			{
				accessorKey: 'performance_key.interpersonal_discussion_outside_the_classroom',
				header: () => (
					<>
						Interpersonal Discussion <br /> Outside The Classroom
					</>
				),
				enableColumnFilter: true,
			},
			{
				accessorKey: 'performance_key.exam_related_discussion',
				header: () => (
					<>
						Exam Related <br /> Discussion
					</>
				),
				enableColumnFilter: true,
			},
		],
	},
	{
		accessorKey: 'mid_performance_percentage',
		header: () => <>Mid (%)</>,
		enableColumnFilter: true,
	},
	{
		accessorKey: 'final_performance_percentage',
		header: () => <>Final (%)</>,
		enableColumnFilter: true,
	},
	{
		accessorKey: 'average_performance_percentage',
		header: () => <>Average (%)</>,
		enableColumnFilter: true,
	},
	{
		accessorKey: 'change_in_performance_percentage',
		header: () => <>Change in (%)</>,
		enableColumnFilter: true,
	},
];

//* Teacher Evaluation Teacher
export const teacherEvaluationTeacherColumns = (): ColumnDef<IReportTeacherEvaluationTeacherTableData>[] => [
	{
		accessorKey: 'teacher_name',
		header: 'Teacher',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'year',
		header: 'Year',
		enableColumnFilter: true,
		cell: (info) => {
			const { year } = info.row.original;

			return (
				<div className='flex gap-4'>
					{year.map((y) => (
						<table className='table w-full border-2 align-top'>
							<thead>
								<tr>
									<th colSpan={y.semester.length} className='border-2 bg-slate-200 py-1 text-center'>
										Semester - {y.semester_year}
									</th>
								</tr>
								<tr className='border-2'>
									{y.semester.map((s) => (
										<th className='border-2 bg-slate-100 py-1 text-center text-xs'>{s.name}</th>
									))}
								</tr>
							</thead>
							<tbody>
								<tr>
									{y.semester.map((s) => (
										<td className='border-2 py-1 text-center'>
											<strong>Mid:</strong>
											{` ${s.score.mid_performance_percentage}%`}
											<br />
											<strong>Final:</strong>
											{` ${s.score.final_performance_percentage}%`}
										</td>
									))}
								</tr>
							</tbody>
						</table>
					))}
				</div>
			);
		},
	},
];

// * Department Evaluation Semester
export const departmentEvaluationSemesterColumns = (
	accessors: string[]
): ColumnDef<IReportDepartmentEvaluationSemesterTableData>[] => [
	...accessors.map((accessor) => ({
		accessorKey: accessor,
		header: accessor.split('_').join(' ').toUpperCase(),
		enableColumnFilter: true,
	})),
];
