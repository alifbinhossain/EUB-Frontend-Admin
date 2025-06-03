import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import ReactSelect from '@/components/ui/react-select';

import { getDateTime, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { contactUSColumns } from '../_config/columns';
import { IContactUSTableData } from '../_config/columns/columns.type';
import { useContactUs } from '../_config/query';
import { types } from './utils';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const [type, setType] = useState<boolean>(false);
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useContactUs<IContactUSTableData[]>(
		`is_response=${type}`
	);

	const pageInfo = useMemo(() => new PageInfo('Contact Us', url, 'inquiry__contact_us'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IContactUSTableData | null>(null);
	const handleUpdate = (row: Row<IContactUSTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IContactUSTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid || '',
			name: row?.original?.full_name,
		});
	};

	const handleResponse = async (row: Row<IContactUSTableData>) => {
		const is_response = row?.original?.is_response ? false : true;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `/portfolio/contact-us/${row?.original?.uuid}`,
			updatedData: { is_response, updated_at },
		});
	};

	// Table Columns
	const columns = contactUSColumns(handleResponse);

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
				otherToolBarComponents={
					<ReactSelect
						placeholder='Select type'
						options={types}
						menuPortalTarget={document.body}
						styles={{
							menuPortal: (base) => ({ ...base, zIndex: 999 }),
						}}
						value={types.find((option) => option.value === type)}
						onChange={(e: any) => {
							setType(e?.value);
						}}
					/>
				}
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

export default Designation;
