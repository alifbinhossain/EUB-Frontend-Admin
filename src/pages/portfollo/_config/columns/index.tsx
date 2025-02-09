import { ColumnDef } from '@tanstack/react-table';

import {
	IAuthoritiesTableData,
	IBotTableData,
	ICertificateCourseFeeTableData,
	ITuitionFeeTableData,
} from './columns.type';

//* Authorities Columns
export const authoritiesColumns = (): ColumnDef<IAuthoritiesTableData>[] => [
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'short_biography',
		header: 'Short Biography',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
//* Certificate Course Fee Columns
export const certificateCourseFeeColumns = (): ColumnDef<ICertificateCourseFeeTableData>[] => [
	{
		accessorKey: 'programs_uuid',
		header: 'Program UUID',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'fee_per_course',
		header: 'Fee per Course',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
//* Tuition Fee Columns
export const tuitionFeeColumns = (): ColumnDef<ITuitionFeeTableData>[] => [
	{
		accessorKey: 'title',
		header: 'Title',
		enableColumnFilter: true,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'admission_fee',
		header: 'Admission Fee',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'tuition_fee_per_credit',
		header: 'Tuition Fee per Credit',
		enableColumnFilter: false,
		cell: (info) => info.getValue() || 0,
	},
];

//* BOT Columns
export const botColumns = (): ColumnDef<IBotTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'user_name',
		header: 'User Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: false,
	},
];
