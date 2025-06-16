import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { courseTableColumns } from '../config/columns';
import { ICourseTableData } from '../config/columns/columns.type';
import { useFDECourse } from '../config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Semester = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useFDECourse<ICourseTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Library/Course', url, 'library__course'), [url]);

	const handleCreate = () => {
		navigate('/lib/course/create');
	};

	const handleUpdate = (row: Row<ICourseTableData>) => {
		navigate(`/lib/course/${row.original.uuid}/update`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<ICourseTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	// Table Columns
	const columns = courseTableColumns();

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

export default Semester;
