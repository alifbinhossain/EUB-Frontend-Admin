import { useMemo } from 'react';
import { PageProvider, TableProvider } from '@/context';

import { PageInfo } from '@/utils';

import { fdeListColumns } from '../../config/columns';
import { IFDEListTableData } from '../../config/columns/columns.type';
import { useFDEList } from '../../config/query';

const Semester = () => {
	const { data, isLoading, url, refetch } = useFDEList<IFDEListTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Library/Course Assign Log', url, 'library__log'), [url]);

	// Table Columns
	const columns = fdeListColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleRefetch={refetch}
				defaultVisibleColumns={{ actions: false }}
			></TableProvider>
		</PageProvider>
	);
};

export default Semester;
