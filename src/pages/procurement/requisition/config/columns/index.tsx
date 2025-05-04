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
	overrideStoreReceivedAccess: boolean,
	storeReceivedAccess: boolean,
	handleStoreReceived: (row: Row<IRequisitionTableData>) => void,
	providedAccess: boolean,
	handleProvided: (row: Row<IRequisitionTableData>) => void,
	handlePdf: (row: Row<IRequisitionTableData>) => void
): ColumnDef<IRequisitionTableData>[] => [
	{
		accessorKey: 'requisition_id',
		header: 'ID',
		enableColumnFilter: true,
		cell: (info) => (
			<button className='underline' onClick={() => handlePdf(info.row)}>
				{info.getValue() as string}
			</button>
		),
	},
	{
		accessorKey: 'is_store_received',
		header: () => (
			<div>
				Store <br /> Received
			</div>
		),
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex flex-col'>
					<Switch
						checked={Number(info.getValue()) === 1}
						onCheckedChange={() => handleStoreReceived(info.row)}
						disabled={
							storeReceivedAccess && info.row.original.is_store_received && !overrideStoreReceivedAccess
						}
					/>
					<span className='text-[0.7rem] font-semibold capitalize text-primary'>
						{info.row.original.pi_generated_number}
					</span>
					<DateTime
						date={
							info.row.original.store_received_date
								? new Date(info.row.original.store_received_date)
								: null
						}
						isTime={false}
					/>
				</div>
			);
		},
		size: 40,
		meta: {
			hidden: !storeReceivedAccess && !overrideStoreReceivedAccess,
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
		accessorKey: 'is_received',
		header: () => (
			<div>
				Consumer <br /> Received
			</div>
		),
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div>
					<Switch
						checked={Number(info.getValue()) === 1}
						onCheckedChange={() => handleReceived(info.row)}
						disabled={receivedAccess && info.row.original.is_received && !overrideReceivedAccess}
					/>
					<DateTime
						date={info.row.original.received_date ? new Date(info.row.original.received_date) : null}
						isTime={false}
					/>
				</div>
			);
		},
		size: 40,
		meta: {
			hidden: !receivedAccess && !overrideReceivedAccess,
		},
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
		id: 'actions',
		accessorKey: 'actions',
		header: () => <p className='text-center'>Actions</p>,
		enableColumnFilter: false,
		enableSorting: false,
		enableHiding: false,
		cell: (info) => (
			<TableCellAction
				info={info}
				hiddenUpdate={info.row.original.is_received || info.row.original.is_store_received}
				hiddenDelete={info.row.original.is_received || info.row.original.is_store_received}
			/>
		),
		size: 60,
		meta: {
			hidden: !updateAccess && !deleteAccess,
			disableFullFilter: true,
		},
	},
];
