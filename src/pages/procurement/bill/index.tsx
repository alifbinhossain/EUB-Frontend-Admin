import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { billColumns } from './config/columns';
import { IBillTableData } from './config/columns/columns.type';
import { type1FacetedFilters } from './config/columns/facetedFilters';
import { useBill } from './config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Bill = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useBill<IBillTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Procure/Bill', url, 'procurement__bill'), [url]);

	const handleCreate = () => navigate('/procurement/bill/create');
	const handleUpdate = (row: Row<IBillTableData>) => {
		navigate(`/procurement/bill/${row.original.uuid}/update`);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IBillTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.bill_id,
		});
	};

	// Table Columns
	const columns = billColumns();
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
				// TODO: Update facetedFilters (OPTIONAL)
				facetedFilters={type1FacetedFilters}
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

export default Bill;
