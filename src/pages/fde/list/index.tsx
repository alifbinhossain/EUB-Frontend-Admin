import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAuth from '@/hooks/useAuth';

import { ToolbarComponent } from '@/components/core/data-table/_components/toolbar';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import ReactSelect from '@/components/ui/react-select';

import { getDateTime, PageInfo } from '@/utils';

import { fdeListColumns } from '../config/columns';
import { IFDEListTableData } from '../config/columns/columns.type';
import { useFDEList } from '../config/query';
import { statusList } from './utils';

const Semester = () => {
	const { user } = useAuth();

	const [status, setStatus] = useState('pending');
	const query = `user_uuid=${user?.uuid}&status=${status}`;
	// const query = `status=${status}`;
	const { data, isLoading, url, updateData, refetch } = useFDEList<IFDEListTableData[]>(query);

	const pageInfo = useMemo(() => new PageInfo('FDE/Evaluation', url, 'fde__evaluation'), [url]);

	const handleMidEvolution = async (row: Row<IFDEListTableData>) => {
		const is_mid_evaluation_complete = row?.original?.is_mid_evaluation_complete ? false : true;
		const updated_at = getDateTime();
		await updateData.mutateAsync({
			url: `/lib/sem-crs-thr-entry/${row?.original?.uuid}`,
			updatedData: { is_mid_evaluation_complete, updated_at },
		});
	};
	const handleFinalEvolution = async (row: Row<IFDEListTableData>) => {
		const is_final_evaluation_complete = row?.original?.is_final_evaluation_complete ? false : true;
		const updated_at = getDateTime();
		await updateData.mutateAsync({
			url: `/lib/sem-crs-thr-entry/${row?.original?.uuid}`,
			updatedData: { is_final_evaluation_complete, updated_at },
		});
	};
	// Table Columns
	const columns = fdeListColumns({ handleMidEvolution, handleFinalEvolution });

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleRefetch={refetch}
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
					remarks: false,
					created_at: false,
					updated_at: false,
					created_by_name: false,
					actions: false,
				}}
			></TableProvider>
		</PageProvider>
	);
};

export default Semester;
