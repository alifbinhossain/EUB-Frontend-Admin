import { lazy, useMemo } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';
import useAuth from '@/hooks/useAuth';

import { PageInfo } from '@/utils';

import { respondingStudentColumns } from '../../../fde/config/columns';
import { IRespondingStudentTableData } from '../../../fde/config/columns/columns.type';
import { useFDERespondingStudent } from '../../../fde/config/query';

const Designation = () => {
	const navigate = useNavigate();

	const { data, isLoading, url, refetch } = useFDERespondingStudent<IRespondingStudentTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('FDE/Responding Student', url, 'fde__log'), [url]);
	const pageAccess = useAccess('fde__form') as string[];
	const show_student_ID = pageAccess.includes('show_student_ID');
	// Table Columns
	const columns = respondingStudentColumns({ showStudentID: show_student_ID });

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleRefetch={refetch}
				defaultVisibleColumns={{ created_at: false, created_by_name: false, actions: false, remarks: false }}
			></TableProvider>
		</PageProvider>
	);
};

export default Designation;
