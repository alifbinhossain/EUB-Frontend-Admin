import { use, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';

import { IFormSelectOption } from '@/components/core/form/types';
import ReactSelect from '@/components/ui/react-select';

import { useOtherDepartments } from '@/lib/common-queries/other';
import { PageInfo } from '@/utils';

import { departmentEvaluationSemesterColumns } from '../config/columns';
import { IReportTeacherEvaluationTeacherTableData } from '../config/columns/columns.type';
import { useFDEReportDepartmentEvaluationSemester } from '../config/query';

const Semester = () => {
	const [department, setDepartment] = useState('');

	const { data, isLoading, url, refetch } =
		useFDEReportDepartmentEvaluationSemester<IReportTeacherEvaluationTeacherTableData[]>(department);
	const { data: departmentOptions } = useOtherDepartments<IFormSelectOption[]>();

	const pageInfo = useMemo(
		() =>
			new PageInfo(
				'FDE/Report/Department Evaluation (Semester)',
				url,
				'fde__report_department_evaluation_semester'
			),
		[url]
	);

	const accessors = useMemo(() => {
		return Object.keys(data?.[0] || {});
	}, [data]);

	// Table Columns
	const columns = departmentEvaluationSemesterColumns(accessors);

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
				toolbarOptions={['all', 'export-csv', 'export-pdf']}
				otherToolBarComponents={
					<div className='flex gap-4'>
						<ReactSelect
							placeholder='Select Department'
							className='w-96'
							options={departmentOptions || []}
							value={departmentOptions?.find((option) => option.value === department)}
							menuPortalTarget={document.body}
							styles={{
								menuPortal: (base) => ({ ...base, zIndex: 999 }),
							}}
							onChange={(e: any) => {
								setDepartment(e?.value);
							}}
						/>
					</div>
				}
			/>
		</PageProvider>
	);
};

export default Semester;
