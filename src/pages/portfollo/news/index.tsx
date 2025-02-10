import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { newsColumns } from '../_config/columns';
import { INewsTableData } from '../_config/columns/columns.type';
import { useNews } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, postData, updateData, imagePostData, imageUpdateData, refetch } =
		useNews<INewsTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('News', url, 'portfolio__news'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		// setIsOpenAddModal(true);
		navigate('/portfolio/news/entry');
	};

	const [updatedData, setUpdatedData] = useState<INewsTableData | null>(null);
	const handleUpdate = (row: Row<INewsTableData>) => {
		// setUpdatedData(row.original);
		// setIsOpenAddModal(true);
		navigate(`/portfolio/news/entry/${row.original.uuid}/update`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<INewsTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.title,
		});
	};

	// Table Columns
	const columns = newsColumns();

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
							imagePostData,
							imageUpdateData,
						}}
					/>,

					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url: '/portfolio/news',
							deleteData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Designation;
