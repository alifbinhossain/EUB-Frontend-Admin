import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { DeleteModal } from '@/components/core/modal';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { RoomAllocationColumns } from '../../config/columns';
import { IRoomAllocationTableData } from '../../config/columns/columns.type';
import { useRoomAllocationData } from '../../config/query';

const Semester = () => {
	const { data, isLoading, url, refetch, deleteData } = useRoomAllocationData<IRoomAllocationTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Library/Room Allocation Log', url, 'library__log'), [url]);

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IRoomAllocationTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.room_name,
		});
	};

	// Table Columns
	const columns = RoomAllocationColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleRefetch={refetch}
				defaultVisibleColumns={{ actions: true }}
				handleDelete={handleDelete}
			>
				{renderSuspenseModals([
					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url,
							deleteData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Semester;
