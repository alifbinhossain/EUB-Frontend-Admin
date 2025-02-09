import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { certificateCourseFeeColumns } from '../_config/columns';
import { ICertificateCourseFeeTableData } from '../_config/columns/columns.type';
import { usePortfolioCertificateCourseFees } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const CertificatesCourseFee = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		usePortfolioCertificateCourseFees<ICertificateCourseFeeTableData[]>();

	const pageInfo = useMemo(
		() => new PageInfo('Portfolio/CertificatesCourseFee', url, 'portfolio__certificates_course_fee'),
		[url]
	);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<ICertificateCourseFeeTableData | null>(null);
	const handleUpdate = (row: Row<ICertificateCourseFeeTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<ICertificateCourseFeeTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.programs_name,
		});
	};

	// Table Columns
	const columns = certificateCourseFeeColumns();

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

export default CertificatesCourseFee;
