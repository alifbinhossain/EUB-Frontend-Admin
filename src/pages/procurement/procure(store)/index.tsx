import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { create } from 'lodash';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { itemWorkOrderColumns } from './config/columns';
import { IProcureStoreTableData } from './config/columns/columns.type';
import { useItemWorkOrder } from './config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useItemWorkOrder<IProcureStoreTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Procure (Store)', url, 'procurement__procure_store'), [url]);

	const handleCreate = () => {
		navigate('/procurement/procure-store/create');
	};

	const handleUpdate = (row: Row<IProcureStoreTableData>) => {
		navigate(`/procurement/procure-store/${row.original.uuid}/update`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IProcureStoreTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.uuid,
		});
	};

	// const handleDetails = (row: Row<IProcureStoreTableData>) => {
	// 	navigate(`/procurement/procure-store-details/${row.original.uuid}`);
	// };

	// Table Columns
	const columns = itemWorkOrderColumns();

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
				defaultVisibleColumns={{
					created_by_name: false,
					updated_at: false,
				}}
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
