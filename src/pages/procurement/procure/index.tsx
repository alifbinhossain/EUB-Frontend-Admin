import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { capitalColumns } from './config/columns';
import { ICapitalTableData } from './config/columns/columns.type';
import { useCapital } from './config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useCapital<ICapitalTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Procure', url, 'procurement__procure'), [url]);

	const handleCreate = () => {
		navigate('/procurement/procure/create');
	};

	const handleUpdate = (row: Row<ICapitalTableData>) => {
		navigate(`/procurement/procure/${row.original.uuid}/update`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<ICapitalTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.uuid,
		});
	};

	const handleDetails = (row: Row<ICapitalTableData>) => {
		navigate(`/procurement/procure-details/${row.original.uuid}`);
	};

	// Table Columns
	const columns = capitalColumns(handleDetails);

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
