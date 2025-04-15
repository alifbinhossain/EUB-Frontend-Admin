import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';
import useAuth from '@/hooks/useAuth';

import { getDateTime, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { requisitionColumns } from './config/columns';
import { IRequisitionTableData } from './config/columns/columns.type';
import { useRequisition } from './config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Requisition = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const pageAccess = useAccess('procurement__requisition') as string[];
	const providedAccess = pageAccess.includes('click_provided');
	const receivedAccess = pageAccess.includes('click_received');
	const overrideReceivedAccess = pageAccess.includes('click_received_override');
	const updateAccess = pageAccess.includes('update');
	const deleteAccess = pageAccess.includes('delete');
	const showAll = pageAccess.includes('show_all');
	const { data, isLoading, url, deleteData, refetch, updateData } = useRequisition<IRequisitionTableData[]>(
		showAll,
		user?.uuid
	);
	const pageInfo = useMemo(() => new PageInfo('Requisition', url, 'procurement__requisition'), [url]);

	// Add/Update Modal state

	const handleCreate = () => {
		navigate('/procurement/requisition/create');
	};

	const handleUpdate = (row: Row<IRequisitionTableData>) => {
		navigate(`/procurement/requisition/${row.original.uuid}/update`);
	};
	const handleProvided = (row: Row<IRequisitionTableData>) => {
		navigate(`/procurement/requisition/${row.original.uuid}/provided`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IRequisitionTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.internal_cost_center_name,
		});
	};
	const handleReceived = async (row: Row<IRequisitionTableData>) => {
		const is_received = row?.original?.is_received ? false : true;
		const updated_at = getDateTime();
		const received_date: string | null = is_received ? getDateTime() : null;

		await updateData.mutateAsync({
			url: `/procure/requisition/${row?.original?.uuid}`,
			updatedData: { is_received, updated_at, received_date },
		});
	};

	// Table Columns
	const columns = requisitionColumns(
		updateAccess,
		deleteAccess,
		overrideReceivedAccess,
		receivedAccess,
		handleReceived,
		providedAccess,
		handleProvided
	);

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
				enableDefaultColumns={false}
			>
				{renderSuspenseModals([
					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url: '/procure/requisition',
							deleteData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Requisition;
