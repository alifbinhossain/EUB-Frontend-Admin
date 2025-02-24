import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import { PageInfo } from '@/utils';
import getAccess from '@/utils/getAccess';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { newsColumns } from '../_config/columns';
import { INewsTableData } from '../_config/columns/columns.type';
import { useNews } from '../_config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const navigate = useNavigate();
	const hasAccess: string[] = useAccess('portfolio__news') as string[];
	const { data, isLoading, url, deleteData, refetch } = useNews<INewsTableData[]>(getAccess(hasAccess));

	const pageInfo = useMemo(() => new PageInfo('News & Events', url, 'portfolio__news'), [url]);

	const handleCreate = () => {
		// setIsOpenAddModal(true);
		navigate('/portfolio/news/entry');
	};

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
				defaultVisibleColumns={{
					created_by_name: false,
					created_at: false,
					updated_at: false,
				}}
				title={pageInfo.getTitle()}
				clientRedirectUrl='/news-events'
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
