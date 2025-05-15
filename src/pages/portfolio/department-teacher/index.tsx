import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';

import { PageInfo } from '@/utils';
import getAccess from '@/utils/getAccess';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { departmentColumns } from '../_config/columns';
import { IDepartmentTableData } from '../_config/columns/columns.type';
import { useDepartments } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Designation = () => {
	const navigate = useNavigate();
	const hasAccess: string[] = useAccess('portfolio__department_teachers') as string[];
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useDepartments<IDepartmentTableData[]>(
		getAccess(hasAccess)
	);

	const pageInfo = useMemo(
		() => new PageInfo('Faculty Members', url, 'portfolio__department_faculty_members'),
		[url]
	);

	// Add/Update Modal state
	const handleCreate = () => navigate('/portfolio/office/create');
	const handleUpdate = (row: Row<IDepartmentTableData>) => {
		navigate(`/portfolio/faculty-members/${row.original.uuid}/update`);
	};

	// Table Columns
	const columns = departmentColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				defaultVisibleColumns={{
					created_by_name: false,
					created_at: false,
					updated_at: false,
				}}
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleRefetch={refetch}
			></TableProvider>
		</PageProvider>
	);
};

export default Designation;
