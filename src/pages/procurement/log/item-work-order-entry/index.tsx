import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { itemWorkOrderEntryColumns } from '../config/columns';
import { IItemWorkOrderEntryTableData } from '../config/columns/columns.type';
import { useItemWorkOrderEntry } from '../config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Vendor = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		useItemWorkOrderEntry<IItemWorkOrderEntryTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Procurement/Procure Entry Log', url, 'procurement__log'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IItemWorkOrderEntryTableData | null>(null);
	const handleUpdate = (row: Row<IItemWorkOrderEntryTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IItemWorkOrderEntryTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.item_name,
		});
	};

	// Table Columns
	const columns = itemWorkOrderEntryColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
			>
				{renderSuspenseModals([
					<AddOrUpdate
						{...{
							url,
							open: isOpenAddModal,
							setOpen: setIsOpenAddModal,
							updatedData,
							setUpdatedData,
							postData,
							updateData,
						}}
					/>,

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

export default Vendor;
