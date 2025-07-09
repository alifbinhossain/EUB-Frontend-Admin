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
import { IItemTransfer, IRequest } from './config/schema';

const ItemTrx = lazy(() => import('./trx-against-order'));
const ItemRequest = lazy(() => import('./request'));
const Details = lazy(() => import('./details'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const getAccess = (pageAccess: string[]) => {
	if (pageAccess.includes('show_maintenance')) {
		return 'store_type=maintenance';
	} else if (pageAccess.includes('show_general')) {
		return 'store_type=general';
	} else if (pageAccess.includes('show_it_store')) {
		return 'store_type=it_store';
	} else {
		return '';
	}
};

const Designation = () => {
	const navigate = useNavigate();
	const pageAccess = useAccess('procurement__item') as string[];

	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useItem<IItemTableData[]>(
		getAccess(pageAccess)
	);
	const [itemUuid, setItemUuid] = useState<string | null>(null);

	const pageInfo = useMemo(() => new PageInfo('Item', url, 'procurement__item'), [url]);

	// Add/Update Modal state

	const actionITemTrxAccess = pageAccess.includes('click_item_trx');

	const handleCreate = () => {
		// setIsOpenAddModal(true);
		navigate('/procurement/item/create');
	};
	const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
	const handleUpdate = (row: Row<IItemTableData>) => {
		navigate(`/procurement/item/${row.original.uuid}/update`);
	};
	const handleDetails = (row: Row<IItemTableData>) => {
		setItemUuid(row.original.uuid);
		setIsOpenDetailsModal(true);
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
	const [isOpenRequestTrxModal, setIsOpenRequestTrxModal] = useState(false);
	const [updateRequestTrxData, setUpdateRequestTrxData] = useState<IRequest | null>(null);

	const handleTrx = (row: Row<IItemTableData>) => {
		setUpdateActionTrxData({
			quantity: row.original.quantity,
			item_uuid: row.original.uuid,
			remarks: null,
			reason: 'emergency',
		});
		setIsOpenActionTrxModal(true);
	};
	const handleRequest = (row: Row<IItemTableData>) => {
		setUpdateRequestTrxData({
			request_quantity: row.original.quantity,
			item_uuid: row.original.uuid,
			remarks: null,
			reason: 'emergency',
		});

		setIsOpenRequestTrxModal(true);
	};

	// Table Columns
	const columns = itemColumns(actionITemTrxAccess, handleTrx, handleDetails, handleRequest);

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
				defaultVisibleColumns={{ updated_at: false, created_at: false, created_by_name: false }}
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
					<ItemRequest
						{...{
							open: isOpenRequestTrxModal,
							setOpen: setIsOpenRequestTrxModal,
							updatedData: updateRequestTrxData,
							setUpdatedData: setUpdateRequestTrxData,
							postData,
							updateData,
							url: '/procure/item-work-order-entry',
						}}
					/>,
					<Details
						{...{
							itemUuid: itemUuid ?? '',
							setItemUuid,
							open: isOpenDetailsModal,
							setOpen: setIsOpenDetailsModal,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Designation;
