import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { ToolbarComponent } from '@/components/core/data-table/_components/toolbar';
import { Badge } from '@/components/ui/badge';
import ReactSelect from '@/components/ui/react-select';

import { cn } from '@/lib/utils';
import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { capitalColumns } from './config/columns';
import { ICapitalTableData } from './config/columns/columns.type';
import { useCapital, useCapitalSummery } from './config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const navigate = useNavigate();
	const [status, setStatus] = useState(undefined);
	const statusList = [
		{ value: undefined, label: 'All' },
		{ value: 'Requested', label: 'Requested' },
		{ value: 'Pipeline', label: 'Pipeline' },
		{ value: 'Decided', label: 'Decided' },
		{ value: 'Committed', label: 'Committed' },
		{ value: 'Paid', label: 'Paid' },
	];
	const { data, isLoading, url, deleteData, refetch } = useCapital<ICapitalTableData[]>(
		status ? `status=${status}` : undefined
	);

	const { data: summery, isLoading: summeryLoading } = useCapitalSummery();

	const pageInfo = useMemo(() => new PageInfo('Procure (Capital)', url, 'procurement__procure_capital'), [url]);

	const handleCreate = () => {
		navigate('/procurement/procure-capital/create');
	};

	const handleUpdate = (row: Row<ICapitalTableData>) => {
		navigate(`/procurement/procure-capital/${row.original.uuid}/update`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<ICapitalTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.uuid,
		});
	};

	const handleDetails = (row: Row<ICapitalTableData>) => {
		navigate(`/procurement/procure-capital-details/${row.original.uuid}`);
	};

	// Table Columns
	const columns = capitalColumns(handleDetails);
	const toolbar = [
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
		/>,
		...(Array.isArray(summery)
			? summery
					.filter((item: any) => status === undefined || item.status === status)
					.map((item: any) => (
						<ToolbarComponent
							option='other'
							render={() => (
								<div
									className={cn(
										item?.status === 'Requested' && 'rounded-sm bg-red-500 text-white',
										item?.status === 'Pipeline' && 'bg-yellow-500 text-white',
										item?.status === 'Decided' && 'bg-blue-500 text-white',
										item?.status === 'Committed' && 'bg-teal-500 text-white',
										item?.status === 'Paid' && 'bg-green-500 text-white',
										'rounded p-1 text-xs'
									)}
								>
									<table className='w-full' border={3}>
										<tr>
											<td className='text-sm font-semibold'>{item?.status}</td>
										</tr>
										<tr>
											<td>Value: {item?.total}</td>
										</tr>
										<tr>
											<td>Count: {item?.count}</td>
										</tr>
									</table>
								</div>
							)}
						/>
					))
			: []),
	];

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading && summeryLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
				otherToolBarComponents={toolbar}
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

export default Designation;
