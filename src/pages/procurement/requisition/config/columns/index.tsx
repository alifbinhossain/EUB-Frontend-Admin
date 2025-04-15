import { ColumnDef, Row } from '@tanstack/react-table';

import Transfer from '@/components/buttons/transfer';
import TableCellAction from '@/components/core/data-table/_components/cell-action';
import HoverCardWrapper from '@/components/others/hover-card-wrapper';
import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import { IRequisitionTableData } from './columns.type';

// * Requisition Table Columns
export const requisitionColumns = (
	updateAccess: boolean,
	deleteAccess: boolean,
	overrideReceivedAccess: boolean,
	receivedAccess: boolean,
	handleReceived: (row: Row<IRequisitionTableData>) => void,
	providedAccess: boolean,
	handleProvided: (row: Row<IRequisitionTableData>) => void
): ColumnDef<IRequisitionTableData>[] => [
	{
		accessorKey: 'internal_cost_center_name',
		header: 'Internal Cost Center',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'is_received',
		header: 'Received',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<Switch
					checked={Number(info.getValue()) === 1}
					onCheckedChange={() => handleReceived(info.row)}
					disabled={receivedAccess && info.row.original.is_received && !overrideReceivedAccess}
				/>
			);
		},
		size: 40,
		meta: {
			hidden: !receivedAccess && !overrideReceivedAccess,
		},
	},
	{
		accessorKey: 'received_date',
		header: 'Received Date',
		enableColumnFilter: true,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'department',
		header: 'Department',
		enableColumnFilter: true,
	},

	{
		accessorKey: 'remarks',
		header: 'Remarks',
		cell: (info) => <HoverCardWrapper title={info.getValue<string>()} content={info.getValue<string>()} />,
	},
	{
		accessorKey: 'created_by_name',
		header: 'Created By',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'created_at',
		header: 'Created At',
		enablePinning: false,
		cell: (info) => <DateTime date={info.getValue() as Date} />,
		filterFn: 'dateRange',
		meta: {
			filterVariant: 'dateRange',
		},
	},
	{
		accessorKey: 'updated_at',
		header: 'Updated At',
		enablePinning: false,
		cell: (info) => <DateTime date={info.getValue() as Date} />,
		meta: {
			filterVariant: 'dateRange',
		},
	},
	{
		id: 'action_trx',
		header: 'Provide',
		cell: (info) => <Transfer disabled={info.row.original.is_received} onClick={() => handleProvided(info.row)} />,
		size: 40,
		meta: {
			hidden: !providedAccess,
			disableFullFilter: true,
		},
	},
	{
		id: 'actions',
		accessorKey: 'actions',
		header: () => <p className='text-center'>Actions</p>,
		enableColumnFilter: false,
		enableSorting: false,
		enableHiding: false,
		cell: (info) => (
			<TableCellAction
				info={info}
				hiddenUpdate={info.row.original.is_received}
				hiddenDelete={info.row.original.is_received}
			/>
		),
		size: 60,
		meta: {
			hidden: !updateAccess && !deleteAccess,
			disableFullFilter: true,
		},
	},
];
