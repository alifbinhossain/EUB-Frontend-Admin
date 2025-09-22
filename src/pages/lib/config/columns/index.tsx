import { ColumnDef, Row } from '@tanstack/react-table';
import { ArrowBigLeft, ArrowRightCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import DateTime from '@/components/ui/date-time';

import { shiftTypeOptions } from '../../course/utils';
import {
	ICourseAssignTableData,
	ICourseTableData,
	IFDEListTableData,
	IRoomAllocationTableData,
	IRoomTableData,
	ISemesterTableData,
} from './columns.type';

// * Semester Table Columns
export const semesterTableColumns = (
	handleRoomAssign: (row: Row<ISemesterTableData>) => void,
	handleCourseAssign: (row: Row<ISemesterTableData>) => void,
	handleRoomView: (row: Row<ISemesterTableData>) => void
): ColumnDef<ISemesterTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Semester Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: true,
		cell: (info) => <span>{info.getValue() === 'four_month' ? '4 Month' : '6 Month'}</span>,
	},
	{
		accessorKey: 'started_at',
		header: 'Started At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'mid_started_at',
		header: 'Mid\nStarted At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'final_started_at',
		header: `Final\nStarted At`,
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'ended_at',
		header: 'Ended At',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		id: 'action_trx',
		header: 'Assign\nCourse | Room',
		cell: (info) => (
			<div className='flex gap-10'>
				<button onClick={() => handleCourseAssign(info.row)}>
					<ArrowRightCircle size={24} className='text-blue-700' />
				</button>
				<button onClick={() => handleRoomAssign(info.row)}>
					<ArrowRightCircle size={24} className='text-green-700' />
				</button>
			</div>
		),
		size: 40,
		meta: {
			disableFullFilter: true,
		},
	},
	{
		accessorKey: 'room_details_actions',
		header: 'View\nRooms',
		enableColumnFilter: false,
		cell: (info) => (
			<div className='flex gap-10'>
				<button onClick={() => handleRoomView(info.row)}>
					<Eye size={24} className='' />
				</button>
			</div>
		),
	},
	// {
	// 	accessorKey: 'actionsAssigns',
	// 	header: 'Assign',
	// 	enableColumnFilter: false,
	// 	columns: [
	// 		{
	// 			id: 'action_trx',
	// 			header: 'Course',
	// 			cell: (info) => (
	// 				<div className='flex gap-10'>
	// 					<button onClick={() => handleCourseAssign(info.row)}>
	// 						<ArrowRightCircle size={24} className='text-blue-700' />
	// 					</button>
	// 				</div>
	// 			),
	// 		},
	// 		{
	// 			id: 'action_trx',
	// 			header: 'Room',
	// 			cell: (info) => (
	// 				<div className='flex gap-10'>
	// 					<button onClick={() => handleRoomAssign(info.row)}>
	// 						<ArrowRightCircle size={24} className='text-green-700' />
	// 					</button>
	// 				</div>
	// 			),
	// 		},
	// 	],
	// },
	// {
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
		accessorKey: 'code',
		header: 'Course Code',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'name',
		header: 'Course Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'financial_info_name',
		header: 'Department',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'shift_type',
		header: 'Shift',
		enableColumnFilter: true,
		cell: (info) => <span>{shiftTypeOptions.find((item) => item.value === info.getValue())?.label}</span>,
	},
	{
		accessorKey: 'credit',
		header: 'Credit',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'course_type',
		header: 'Course Type',
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
