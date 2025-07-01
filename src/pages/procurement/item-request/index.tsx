import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { ToolbarComponent } from '@/components/core/data-table/_components/toolbar';
import ReactSelect from '@/components/ui/react-select';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { itemRequestColumns } from '../log/config/columns';
import { IITemRequestTableData } from '../log/config/columns/columns.type';
import { useItemRequested } from '../log/config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Vendor = () => {
	const [status, setStatus] = useState('pending');
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useItemRequested<
		IITemRequestTableData[]
	>(`status=${status}`);

	const statusList = [
		{ value: '', label: 'All' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'complete', label: 'Complete' },
	];

	const pageInfo = useMemo(() => new PageInfo('Procurement/Item Request', url, 'procurement__item_request'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const [updatedData, setUpdatedData] = useState<IITemRequestTableData | null>(null);
	const handleUpdate = (row: Row<IITemRequestTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IITemRequestTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.item_name,
		});
	};

	// Table Columns
	const columns = itemRequestColumns({ updateAcess: true, deleteAccess: true });

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
			>
				{renderSuspenseModals([
					<AddOrUpdate
						{...{
							url: `/procure/item-work-order-entry`,
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
							url: `/procure/item-work-order-entry`,
							deleteData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Vendor;
