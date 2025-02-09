import { lazy, useMemo, useState } from 'react';

// import { PageProvider, TableProvider } from '@/context';
// import { Row } from '@tanstack/react-table';

// import { PageInfo } from '@/utils';
// import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { tuitionFeeColumns } from '../_config/columns';
import { ITuitionFeeTableData } from '../_config/columns/columns.type';
import { usePortfolioTuitionFees } from '../_config/query';

// const AddOrUpdate = lazy(() => import('./add-or-update'));
// const DeleteModal = lazy(() => import('@core/modal/delete'));

const TuitionFee = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		usePortfolioTuitionFees<ITuitionFeeTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Portfolio/TuitionFee', url, 'portfolio__tuition_fee'), [url]);

	// // Add/Update Modal state
	// const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	// const handleCreate = () => {
	// 	setIsOpenAddModal(true);
	// };

	const [updatedData, setUpdatedData] = useState<ITuitionFeeTableData | null>(null);
	const handleUpdate = (row: Row<ITuitionFeeTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// // Delete Modal state
	// const [deleteItem, setDeleteItem] = useState<{
	// 	id: string;
	// 	name: string;
	// } | null>(null);

	const handleDelete = (row: Row<ITuitionFeeTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.title,
		});
	};

	// Table Columns
	const columns = tuitionFeeColumns();

	return (
		// <PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
		// 	<TableProvider
		// 		title={pageInfo.getTitle()}
		// 		columns={columns}
		// 		data={data ?? []}
		// 		isLoading={isLoading}
		// 		handleCreate={handleCreate}
		// 		handleUpdate={handleUpdate}
		// 		handleDelete={handleDelete}
		// 		handleRefetch={refetch}
		// 	>
		// 		{renderSuspenseModals([
		// 			<AddOrUpdate
		// 				{...{
		// 					url,
		// 					open: isOpenAddModal,
		// 					setOpen: setIsOpenAddModal,
		// 					updatedData,
		// 					setUpdatedData,
		// 					postData,
		// 					updateData,
		// 				}}
		// 			/>,

		// 			<DeleteModal
		// 				{...{
		// 					deleteItem,
		// 					setDeleteItem,
		// 					url,
		// 					deleteData,
		// 				}}
		// 			/>,
		// 		])}
		// 	</TableProvider>
		// </PageProvider>
		<div>asdasd</div>
	);
};

export default TuitionFee;
