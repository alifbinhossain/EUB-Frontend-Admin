import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { admissionColumns } from '../_config/columns';
import { IAdmissionTableData } from '../_config/columns/columns.type';
import { type1FacetedFilters } from '../_config/columns/facetedFilters';
import { usePortfolioAdmission } from '../_config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Admission = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = usePortfolioAdmission<IAdmissionTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Admission/Online Form', url, 'admission__online_form'), [url]);

	const handleCreate = () => navigate('/admission/online-form/create');
	const handleUpdate = (row: Row<IAdmissionTableData>) => {
		navigate(`/admission/online-form/${row.original.uuid}/update`);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IAdmissionTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.uuid,
		});
	};

	// Table Columns
	const columns = admissionColumns();
	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				defaultVisibleColumns={{
					created_by_name: false,
					created_at: false,
					updated_at: false,
				}}
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				// handleRefetch={refetch}
				// TODO: Update facetedFilters (OPTIONAL)
				facetedFilters={type1FacetedFilters}
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

export default Admission;
