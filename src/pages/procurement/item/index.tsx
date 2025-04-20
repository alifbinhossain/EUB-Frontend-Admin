import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { itemColumns } from './config/columns';
import { IItemTableData } from './config/columns/columns.type';
import { useItem } from './config/query';
import { IItemTransfer } from './config/schema';

const ItemTrx = lazy(() => import('./trx-against-order'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useItem<IItemTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Item', url, 'procurement__item'), [url]);

	// Add/Update Modal state
	const pageAccess = useAccess(pageInfo.getTab() as string) as string[];
	const actionITemTrxAccess = pageAccess.includes('click_item_trx');

	const handleCreate = () => {
		// setIsOpenAddModal(true);
		navigate('/procurement/item/create');
	};

	const [updatedData, setUpdatedData] = useState<IItemTableData | null>(null);
	const handleUpdate = (row: Row<IItemTableData>) => {
		// setUpdatedData(row.original);
		// setIsOpenAddModal(true);

		navigate(`/procurement/item/${row.original.uuid}/update`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IItemTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};
	const [isOpenActionTrxModal, setIsOpenActionTrxModal] = useState(false);
	const [updateActionTrxData, setUpdateActionTrxData] = useState<IItemTransfer | null>(null);

	const handleTrx = (row: Row<IItemTableData>) => {
		setUpdateActionTrxData({
			quantity: row.original.quantity,
			item_uuid: row.original.uuid,
			remarks: null,
			reason: 'emergency',
		});

		setIsOpenActionTrxModal(true);
	};

	// Table Columns
	const columns = itemColumns(actionITemTrxAccess, handleTrx);

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
					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url,
							deleteData,
						}}
					/>,
					<ItemTrx
						{...{
							open: isOpenActionTrxModal,
							setOpen: setIsOpenActionTrxModal,
							updatedData: updateActionTrxData,
							setUpdatedData: setUpdateActionTrxData,
							postData,
							updateData,
							url: '/procure/item-transfer',
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Designation;
