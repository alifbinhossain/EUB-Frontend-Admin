import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { requisitionColumns } from './config/columns';
import { IRequisitionTableData } from './config/columns/columns.type';
import { useRequisition } from './config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Requisition = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useRequisition<IRequisitionTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Requisition', url, 'procurement__requisition'), [url]);

	// Add/Update Modal state

	const handleCreate = () => {
		navigate('/procurement/requisition/create');
	};

	const handleUpdate = (row: Row<IRequisitionTableData>) => {
		navigate(`/procurement/requisition/${row.original.uuid}/update`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IRequisitionTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.internal_cost_center_name,
		});
	};

	// Table Columns
	const columns = requisitionColumns();

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

export default Requisition;
