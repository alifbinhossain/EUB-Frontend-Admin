import { ColumnDef, Row } from '@tanstack/react-table';
import { Link } from 'lucide-react';

import { CustomLink, LinkOnly, LinkWithRedirect } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

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
