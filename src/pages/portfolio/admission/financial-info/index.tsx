import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { financialInformationColumns } from '../_config/columns';
import { IFinancialInfoTableData } from '../_config/columns/columns.type';
import { usePortfolioFinancialInformation } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const TuitionFee = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		usePortfolioFinancialInformation<IFinancialInfoTableData[]>();

	const pageInfo = useMemo(
		() => new PageInfo('Admission/Financial Information', url, 'admission__financial_information'),
		[url]
	);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IFinancialInfoTableData | null>(null);
	const handleUpdate = (row: Row<IFinancialInfoTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IFinancialInfoTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.department_uuid,
		});
	};

	// Table Columns
	const columns = financialInformationColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				defaultVisibleColumns={{
					created_by_name: false,
					created_at: false,
					updated_at: false,
				}}
				title={pageInfo.getTitle()}
				clientRedirectUrl='/financial-information'
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

export default TuitionFee;
