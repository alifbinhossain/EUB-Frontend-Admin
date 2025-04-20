import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import DateTime from '@/components/ui/date-time';

import { IITemTransferTableData } from './columns.type';

// * Vendor
export const vendorColumns = (): ColumnDef<IITemTransferTableData>[] => [
	{
		accessorKey: 'is_requisition_received',
		header: 'Requisition Received',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info.getValue() as number} />,
	},
	{
		accessorKey: 'item_name',
		header: 'Item Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
		enableColumnFilter: true,
	},
];
