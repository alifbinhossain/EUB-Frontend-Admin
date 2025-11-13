import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { getDateTime, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { ticketColumns } from './config/columns';
import { ITicketTableData } from './config/columns/columns.type';
import { useTicket } from './config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Ticket = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, updateData, refetch } = useTicket<ITicketTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Ticket', url, 'procurement__ticket'), [url]);

	const handleCreate = () => {
		navigate('/procurement/ticket/create');
	};

	const handleUpdate = (row: Row<ITicketTableData>) => {
		navigate(`/procurement/ticket/${row.original.uuid}/update`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<ITicketTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.uuid,
		});
	};

	const handleDetails = (row: Row<ITicketTableData>) => {
		navigate(`/procurement/ticket-details/${row.original.uuid}`);
	};

	const handleResolved = async (row: Row<ITicketTableData>) => {
		const is_resolved = row?.original?.is_resolved ? false : true;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `${url}/${row?.original?.uuid}`,
			updatedData: { is_resolved, updated_at },
		});
	};

	// Table Columns
	const columns = ticketColumns(handleDetails, handleResolved);

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
				defaultVisibleColumns={{
					created_by_name: false,
					updated_at: false,
				}}
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

export default Ticket;
