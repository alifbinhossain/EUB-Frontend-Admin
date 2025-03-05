import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';

import { IServiceVendorTableData } from './columns.type';

// * Inquiry
export const serviceVendorColumns = (): ColumnDef<IServiceVendorTableData>[] => [
	{
		accessorKey: 'is_selected',
		header: 'Selected',
		enableColumnFilter: true,
		cell: (info) => <StatusButton value={info?.getValue() as boolean} />,
	},
	{
		accessorKey: 'service_name',
		header: 'Service',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableColumnFilter: true,
	},
];
