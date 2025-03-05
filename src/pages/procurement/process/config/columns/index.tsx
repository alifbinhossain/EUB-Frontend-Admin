import { ColumnDef, Row } from '@tanstack/react-table';

import { Switch } from '@/components/ui/switch';

import { IProcessTableData } from './columns.type';

// * Inquiry
export const processColumns = ({
	handleItems,
	handleService,
	handleRange1,
	handleRange2,
	handleRange3,
	handleRange4,
	itemsAccess,
	serviceAccess,
	range1Access,
	range2Access,
	range3Access,
	range4Access,
}: {
	handleItems: (row: Row<IProcessTableData>) => void;
	handleService: (row: Row<IProcessTableData>) => void;
	handleRange1: (row: Row<IProcessTableData>) => void;
	handleRange2: (row: Row<IProcessTableData>) => void;
	handleRange3: (row: Row<IProcessTableData>) => void;
	handleRange4: (row: Row<IProcessTableData>) => void;
	itemsAccess: boolean;
	serviceAccess: boolean;
	range1Access: boolean;
	range2Access: boolean;
	range3Access: boolean;
	range4Access: boolean;
}): ColumnDef<IProcessTableData>[] => [
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
	{
		accessorKey: 'short_name',
		header: 'Short Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'items',
		header: 'Items',
		enableColumnFilter: false,
		cell: (info) => {
			return <Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleItems(info.row)} />;
		},
		size: 40,
		meta: {
			hidden: !itemsAccess,
		},
	},
	{
		accessorKey: 'service',
		header: 'Service',
		enableColumnFilter: false,
		cell: (info) => {
			return <Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleService(info.row)} />;
		},
		size: 40,
		meta: {
			hidden: !serviceAccess,
		},
	},
	{
		accessorKey: 'range_1',
		header: 'Range 1',
		enableColumnFilter: false,
		cell: (info) => {
			return <Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleRange1(info.row)} />;
		},
		size: 40,
		meta: {
			hidden: !range1Access,
		},
	},
	{
		accessorKey: 'range_2',
		header: 'Range 2',
		enableColumnFilter: false,
		cell: (info) => {
			return <Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleRange2(info.row)} />;
		},
		size: 40,
		meta: {
			hidden: !range2Access,
		},
	},
	{
		accessorKey: 'range_3',
		header: 'Range 3',
		enableColumnFilter: false,
		cell: (info) => {
			return <Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleRange3(info.row)} />;
		},
		size: 40,
		meta: {
			hidden: !range3Access,
		},
	},
	{
		accessorKey: 'range_4',
		header: 'Range 4',
		enableColumnFilter: false,
		cell: (info) => {
			return <Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleRange4(info.row)} />;
		},
		size: 40,
		meta: {
			hidden: !range4Access,
		},
	},
];
