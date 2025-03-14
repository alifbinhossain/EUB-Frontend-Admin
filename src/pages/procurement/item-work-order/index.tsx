import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { itemWorkOrderEntryColumns } from './config/columns';
import { IItemWorkOrderTableData } from './config/columns/columns.type';
import { useItemWordOrder } from './config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		useItemWordOrder<IItemWorkOrderTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Item Work Order', url, 'procurement__item_work_order'), [url]);

	const handleCreate = () => {
		navigate('/procurement/item-work-order/create');
	};

	const handleUpdate = (row: Row<IItemWorkOrderTableData>) => {
		navigate(`/procurement/item-work-order/${row.original.uuid}/update`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IItemWorkOrderTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.uuid,
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

export default Designation;
