import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { respondingStudentColumns } from '../../fde/config/columns';
import { IRespondingStudentTableData } from '../../fde/config/columns/columns.type';
import { useFDERespondingStudent } from '../../fde/config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useFDERespondingStudent<IRespondingStudentTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('FDE/Form', url, 'fde__form'), [url]);
	const pageAccess = useAccess('fde__form') as string[];
	const show_student_ID = pageAccess.includes('show_student_ID');

	// /fde/:sem_crs_thr_entry_uuid/:evaluation_time/:uuid
	const handleUpdate = (row: Row<IRespondingStudentTableData>) => {
		navigate(
			`/fde/${row.original.sem_crs_thr_entry_uuid}/${row.original.evaluation_time}/${row.original.uuid}/update`
		);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IRespondingStudentTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.uuid,
		});
	};

	// Table Columns
	const columns = respondingStudentColumns({ showStudentID: show_student_ID });

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
				defaultVisibleColumns={{ created_at: false, created_by_name: false, actions: show_student_ID }}
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

export default Designation;
