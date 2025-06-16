import { useMemo } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';

import { courseAssignTableColumns } from '../config/columns';
import { ICourseAssignTableData } from '../config/columns/columns.type';
import { useFDESemester } from '../config/query';

const Semester = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, refetch } = useFDESemester<ICourseAssignTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Library/Course Assign', url, 'library__course_assign'), [url]);

	const handleUpdate = (row: Row<ICourseAssignTableData>) => {
		navigate(`/lib/course-assign/${row.original.uuid}/create`);
	};

	// Table Columns
	const columns = courseAssignTableColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleUpdate={handleUpdate}
				handleRefetch={refetch}
				toolbarOptions={[
					'advance-filter',
					'all',
					'all-filter',
					'date-range',
					'export-csv',
					'export-pdf',
					'faceted-filter',
					'other',
					'refresh',
					'view',
				]}
			/>
		</PageProvider>
	);
};

export default Semester;
