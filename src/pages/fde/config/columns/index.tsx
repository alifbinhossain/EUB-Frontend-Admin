import { ColumnDef, Row } from '@tanstack/react-table';
import { Clipboard, QrCode } from 'lucide-react';

import { CustomLink, LinkOnly, LinkWithRedirect } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import { EvaluationCell } from '../components';
import {
	IFDEListTableData,
	IQuestionCategoryTableData,
	IQuestionTableData,
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
	handleQRClick,
}: {
	handleMidEvolution: (row: Row<IFDEListTableData>) => void;
	handleFinalEvolution: (row: Row<IFDEListTableData>) => void;
	handleQRClick: (row: Row<IFDEListTableData>, type: 'mid' | 'final') => void;
}): ColumnDef<IFDEListTableData>[] => [
	{
		accessorKey: 'semester_name',
		header: 'Semester',
		enableColumnFilter: true,
		size: 40,
	},
	{
		accessorKey: 'teacher_name',
		header: 'Teacher',
		enableColumnFilter: true,
		size: 40,
	},
	{
		accessorKey: 'department_name',
		header: 'Department',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'course_name',
		header: 'Course',
		enableColumnFilter: true,
		size: 40,
		cell: (info) => {
			const { course_code, course_name } = info.row.original;
			return (
				<div>
					<span className='font-semibold'>{course_code}</span>: {course_name}
				</div>
			);
		},
	},
	{
		accessorKey: 'course_section_name',
		header: 'Section',
		enableColumnFilter: true,
		size: 40,
	},

	{
		accessorKey: 'class_size',
		header: 'Class Size',
		enableColumnFilter: true,
		size: 40,
	},
	{
		accessorKey: 'is_mid_evaluation_complete',
		header: 'Mid Evaluation',
		enableColumnFilter: true,
		cell: (info) => (
			<EvaluationCell
				rowData={info.row}
				evaluationType='mid'
				isComplete={info.row.original.is_mid_evaluation_complete}
				responseCount={info.row.original.mid_evaluation_response || 0}
				onSwitchChange={handleMidEvolution}
				onQRClick={handleQRClick}
			/>
		),
		size: 40,
	},
	{
		accessorKey: 'is_final_evaluation_complete',
		header: 'Final Evaluation',
		enableColumnFilter: true,
		cell: (info) => (
			<EvaluationCell
				rowData={info.row}
				evaluationType='final'
				isComplete={info.row.original.is_final_evaluation_complete}
				responseCount={info.row.original.final_evaluation_response || 0}
				isDisabled={!info.row.original.is_mid_evaluation_complete}
				onSwitchChange={handleFinalEvolution}
				onQRClick={handleQRClick}
			/>
		),
		size: 40,
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
