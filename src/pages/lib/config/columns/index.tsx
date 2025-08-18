import { ColumnDef } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';

import {
	ICourseAssignTableData,
	ICourseTableData,
	IFDEListTableData,
	IRoomAllocationTableData,
	IRoomTableData,
	ISemesterTableData,
} from './columns.type';

// * Semester Table Columns
export const semesterTableColumns = (): ColumnDef<ISemesterTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Semester Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'started_at',
		header: 'Started At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'mid_started_at',
		header: 'Mid Started At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'final_started_at',
		header: 'Final Started At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'ended_at',
		header: 'Ended At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];

// * Room Table Columns
export const roomTableColumns = (): ColumnDef<IRoomTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'location',
		header: 'Location',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'capacity',
		header: 'Capacity',
		enableColumnFilter: true,
	},
];

//*Course
export const courseTableColumns = (): ColumnDef<ICourseTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Course Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'code',
		header: 'Course Code',
		enableColumnFilter: true,
	},
];

//* Course Assign Table Columns
export const courseAssignTableColumns = (): ColumnDef<ICourseAssignTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Semester Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'started_at',
		header: 'Started At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'mid_started_at',
		header: 'Mid Started At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'final_started_at',
		header: 'Final Started At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'ended_at',
		header: 'Ended At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];
//*FDE List
export const fdeListColumns = (): ColumnDef<IFDEListTableData>[] => [
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
];

export const RoomAllocationColumns = (): ColumnDef<IRoomAllocationTableData>[] => [
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
		accessorKey: 'course_code',
		header: 'Course Code',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'course_section',
		header: 'Section',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'room_name',
		header: 'Room',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'class_size',
		header: 'Class Size',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'day',
		header: 'Day',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'from',
		header: 'From',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'to',
		header: 'To',
		enableColumnFilter: true,
	},
];
