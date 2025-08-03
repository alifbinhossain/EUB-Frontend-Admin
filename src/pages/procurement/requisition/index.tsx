import { lazy, useEffect, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';
import useAuth from '@/hooks/useAuth';

import { ToolbarComponent } from '@/components/core/data-table/_components/toolbar';
import Pdf from '@/components/pdf/item-requstion';
import ReactSelect from '@/components/ui/react-select';

import { getDateTime, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { requisitionColumns } from './config/columns';
import { IRequisitionTableData } from './config/columns/columns.type';
import { useRequisition, useRequisitionAndItemByUUID } from './config/query';
import { getRndInteger } from './utils';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Requisition = () => {
	const navigate = useNavigate();
	const [status, setStatus] = useState('pending');
	const statusList = [
		{ value: undefined, label: 'All' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'store_not_received', label: 'Requisition Not Received' },
		{ value: 'completed', label: 'Complete' },
	];

	const { user } = useAuth();
	const pageAccess = useAccess('procurement__requisition') as string[];
	const providedAccess = pageAccess.includes('click_provided');
	const receivedAccess = pageAccess.includes('click_received');
	const overrideReceivedAccess = pageAccess.includes('click_received_override');
	const storeReceivedAccess = pageAccess.includes('click_store_received');
	const overrideStoreReceivedAccess = pageAccess.includes('click_store_received_override');
	const updateAccess = pageAccess.includes('update');
	const deleteAccess = pageAccess.includes('delete');
	const showAll = pageAccess.includes('show_all');

	const [pdfUuid, setPdfUuid] = useState<string | null>(null);
	const { data, isLoading, url, deleteData, refetch, updateData } = useRequisition<IRequisitionTableData[]>(
		showAll,
		user?.uuid,
		status
	);
	const { data: pdfData, isLoading: pdfLoading } = useRequisitionAndItemByUUID<IRequisitionTableData>(
		pdfUuid as string
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
	useEffect(() => {
		if (pdfData && !pdfLoading) {
			Pdf(pdfData)?.open();
			setPdfUuid(null);
		}
	}, [pdfData, pdfLoading]);
	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IRequisitionTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.requisition_id,
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
	const handleStoreReceived = async (row: Row<IRequisitionTableData>) => {
		const is_store_received = row?.original?.is_store_received ? false : true;
		const updated_at = getDateTime();
		const store_received_date: string | null = is_store_received ? getDateTime() : null;
		const pi_generated_number = is_store_received ? getRndInteger(100, 999) : 0;
		await updateData.mutateAsync({
			url: `/procure/requisition/${row?.original?.uuid}`,
			updatedData: { is_store_received, updated_at, store_received_date, pi_generated_number },
		});
	};
	const handlePdf = async (row: Row<IRequisitionTableData>) => {
		const uuid = row?.original?.uuid;
		setPdfUuid(uuid);
	};

	// Table Columns
	const columns = requisitionColumns(
		updateAccess,
		deleteAccess,
		overrideReceivedAccess,
		receivedAccess,
		handleReceived,
		overrideStoreReceivedAccess,
		storeReceivedAccess,
		handleStoreReceived,
		providedAccess,
		handleProvided,
		handlePdf
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
				otherToolBarComponents={
					<ToolbarComponent
						option='other'
						render={() => (
							<ReactSelect
								options={statusList || []}
								value={statusList?.find((option) => option.value === status)}
								menuPortalTarget={document.body}
								styles={{
									menuPortal: (base) => ({ ...base, zIndex: 999 }),
								}}
								onChange={(e: any) => {
									setStatus(e?.value);
								}}
							/>
						)}
					/>
				}
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
