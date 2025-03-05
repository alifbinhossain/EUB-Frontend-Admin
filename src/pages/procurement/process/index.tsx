import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAccess from '@/hooks/useAccess';

import { getDateTime, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { processColumns } from './config/columns';
import { IProcessTableData } from './config/columns/columns.type';
import { useProcess } from './config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Process = () => {
	const { data, isLoading, url, deleteData, updateData, refetch } = useProcess<IProcessTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Procurement/Process', url, 'procurement__process'), [url]);
	const pageAccess = useAccess(pageInfo.getTab() as string) as string[];
	const itemsAccess = pageAccess.includes('click_items');
	const serviceAccess = pageAccess.includes('click_service');
	const range1Access = pageAccess.includes('click_range_1');
	const range2Access = pageAccess.includes('click_range_2');
	const range3Access = pageAccess.includes('click_range_3');
	const range4Access = pageAccess.includes('click_range_4');
	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IProcessTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};
	const handleItems = async (row: Row<IProcessTableData>) => {
		const items = row?.original?.items ? false : true;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `${url}/${row?.original?.uuid}`,
			updatedData: { items, updated_at },
		});
	};
	const handleService = async (row: Row<IProcessTableData>) => {
		const service = row?.original?.service ? false : true;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `${url}/${row?.original?.uuid}`,
			updatedData: { service, updated_at },
		});
	};
	const handleRange1 = async (row: Row<IProcessTableData>) => {
		const range_1 = row?.original?.range_1 ? false : true;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `${url}/${row?.original?.uuid}`,
			updatedData: { range_1, updated_at },
		});
	};
	const handleRange2 = async (row: Row<IProcessTableData>) => {
		const range_2 = row?.original?.range_2 ? false : true;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `${url}/${row?.original?.uuid}`,
			updatedData: { range_2, updated_at },
		});
	};
	const handleRange3 = async (row: Row<IProcessTableData>) => {
		const range_3 = row?.original?.range_3 ? false : true;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `${url}/${row?.original?.uuid}`,
			updatedData: { range_3, updated_at },
		});
	};
	const handleRange4 = async (row: Row<IProcessTableData>) => {
		const range_4 = row?.original?.range_4 ? false : true;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `${url}/${row?.original?.uuid}`,
			updatedData: { range_4, updated_at },
		});
	};
	// Table Columns
	const columns = processColumns({
		handleItems,
		handleService,
		handleRange1,
		handleRange2,
		handleRange3,
		handleRange4,
		itemsAccess,
		serviceAccess,
		range1Access,
		range2Access,
		range3Access,
		range4Access,
	});

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
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

export default Process;
