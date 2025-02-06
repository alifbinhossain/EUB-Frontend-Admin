import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import { IDiagnosisTableData, IOrderTableData, IProblemsTableData, ISectionTableData } from './columns.type';

//* Problems Columns
export const problemsColumns = (): ColumnDef<IProblemsTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: false,
	},
];
//* Order Columns
export const orderColumns = (): ColumnDef<IOrderTableData>[] => [
	{
		accessorKey: 'order_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.uuid;
			return <LinkOnly uri={`/work/order/details/${uuid}`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'user_name',
		header: 'Customer',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'model_name',
		header: 'Model',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'size_name',
		header: 'Size',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'serial_no',
		header: 'Serial No',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'problems_name',
		header: 'Problem',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'problem_statement',
		header: 'Problem Statement',
		enableColumnFilter: false,
	},
	{
		accessorFn: (row) => {
			return row.accessories
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Accessories',
		enableColumnFilter: false,
		cell: (info) => {
			const value = info.row.original.accessories as string[];
			return (
				<div className='flex flex-wrap gap-1'>
					{value?.map((item, index) => (
						<span key={index} className='rounded-[10px] bg-accent px-2 py-1 capitalize text-white'>
							{item.replace(/_/g, ' ')}
						</span>
					))}
				</div>
			);
		},
	},

	{
		accessorKey: 'is_product_received',
		header: 'Product Received',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'receive_date',
		header: 'Receive Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'warehouse_name',
		header: 'Warehouse',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'rack_name',
		header: 'Rack',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'floor_name',
		header: 'Floor',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'box_name',
		header: 'Box',
		enableColumnFilter: false,
	},
];
//* Diagnosis Columns
export const diagnosisColumns = (): ColumnDef<IDiagnosisTableData>[] => [
	{
		accessorKey: 'diagnosis_id',
		header: 'Diagnosis ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'order_id',
		header: 'Order ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.order_uuid;
			return <LinkOnly uri={`/work/order/details/${uuid}`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'problems_name',
		header: 'Diagnosis Problem',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'problem_statement',
		header: 'Diagnosis Problem Statement',
		enableColumnFilter: false,
	},

	{
		accessorKey: 'status',
		header: 'Diagnosis Status',
		enableColumnFilter: false,
		cell: (info) => {
			const status = info.getValue() as string;
			const bgColorClass =
				{
					accepted: 'bg-success',
					rejected: 'bg-red-500',
					not_repairable: 'bg-gray-500',
					pending: 'bg-warning',
				}[status.toLowerCase()] || '';

			return <span className={`rounded px-2 py-1 capitalize text-white ${bgColorClass}`}>{status}</span>;
		},
	},
	{
		accessorKey: 'status_update_date',
		header: 'Diagnosis Status Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'proposed_cost',
		header: 'Proposed Cost',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'is_proceed_to_repair',
		header: 'Proceed to Repair',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
];
//* Section Columns
export const sectionColumns = (): ColumnDef<ISectionTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
];
