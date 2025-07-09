import { useMemo } from 'react';
import { PageProvider, TableProvider } from '@/context';
import useAuth from '@/hooks/useAuth';

import { PageInfo } from '@/utils';

import { fdeListColumns } from '../config/columns';
import { IFDEListTableData } from '../config/columns/columns.type';
import { useFDEList } from '../config/query';

const Semester = () => {
	const { user } = useAuth();

	const { data, isLoading, url, updateData, refetch } = useFDEList<IFDEListTableData[]>();

	const pageInfo = useMemo(
		() =>
			new PageInfo(
				'FDE/Report-Teaching Effectiveness Evolution  Summery',
				url,
				'fde__report_teaching_effectiveness_evolution_summery'
			),
		[url]
	);

	// Table Columns
	const columns = fdeListColumns({});

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleRefetch={refetch}
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
