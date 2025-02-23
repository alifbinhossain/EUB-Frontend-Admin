import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAccess from '@/hooks/useAccess';

import { PageInfo } from '@/utils';
import getAccess from '@/utils/getAccess';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { routineColumns } from '../_config/columns';
import { IRoutineTableData } from '../_config/columns/columns.type';
import { useRoutine } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const hasAccess: string[] = useAccess('portfolio__routine') as string[];
	const { data, isLoading, url, deleteData, postData, updateData, imagePostData, imageUpdateData, refetch } =
		useRoutine<IRoutineTableData[]>(getAccess(hasAccess));

	const pageInfo = useMemo(() => new PageInfo('Routine', url, 'portfolio__routine'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IRoutineTableData | null>(null);
	const handleUpdate = (row: Row<IRoutineTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IRoutineTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.uuid,
		});
	};

	// Table Columns
	const columns = routineColumns();

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
