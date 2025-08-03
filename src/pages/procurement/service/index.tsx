import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { serviceColumns } from './config/columns';
import { IServiceTableData } from './config/columns/columns.type';
import { useService } from './config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useService<IServiceTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Service', url, 'procurement__service'), [url]);

	const handleCreate = () => {
		navigate('/procurement/service/create');
	};

	const handleUpdate = (row: Row<IServiceTableData>) => {
		navigate(`/procurement/service/${row.original.uuid}/update`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IServiceTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.uuid,
		});
	};

	const handleDetails = (row: Row<IServiceTableData>) => {
		navigate(`/procurement/service-details/${row.original.uuid}`);
	};

	// Table Columns
	const columns = serviceColumns(handleDetails);

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
