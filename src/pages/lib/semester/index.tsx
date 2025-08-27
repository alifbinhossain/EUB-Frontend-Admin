import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { semesterTableColumns } from '../config/columns';
import { ISemesterTableData } from '../config/columns/columns.type';
import { useFDESemester } from '../config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Semester = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useFDESemester<ISemesterTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Library/Semester', url, 'library__semester'), [url]);

	const navigate = useNavigate();

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<ISemesterTableData | null>(null);
	const handleUpdate = (row: Row<ISemesterTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<ISemesterTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	const handleRoom = (row: Row<ISemesterTableData>) => {
		navigate(`/lib/room-allocation/${row.original.uuid}/create`);
	};
	const handleCourse = (row: Row<ISemesterTableData>) => {
		navigate(`/lib/course-assign/${row.original.uuid}/create`);
	};
	// Table Columns
	const columns = semesterTableColumns(handleRoom, handleCourse);

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
				defaultVisibleColumns={{ updated_at: false, created_by_name: false }}
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

export default Semester;
