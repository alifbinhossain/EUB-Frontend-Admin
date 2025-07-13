import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';

import { IFormSelectOption } from '@/components/core/form/types';
import ReactSelect from '@/components/ui/react-select';
import CoreForm from '@core/form';

import { useOtherSemester } from '@/lib/common-queries/other';
import { PageInfo } from '@/utils';

import { teacherEvaluationColumns } from '../config/columns';
import { IReportTeacherEvaluationTableData } from '../config/columns/columns.type';
import { useFDEReportTeacherEvaluation } from '../config/query';

const Semester = () => {
	const [semester, setSemester] = useState('');
	const { data, isLoading, url, refetch } =
		useFDEReportTeacherEvaluation<IReportTeacherEvaluationTableData[]>(semester);
	const { data: semesterOptions } = useOtherSemester<IFormSelectOption[]>();

	const pageInfo = useMemo(
		() => new PageInfo('FDE/Report/Teacher Evaluation (Semester)', url, 'fde__report_teacher_evaluation_semester'),
		[url]
	);

	// Table Columns
	const columns = teacherEvaluationColumns();

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
					<ReactSelect
						className='w-40'
						placeholder='Select Semester'
						options={semesterOptions || []}
						value={semesterOptions?.find((option) => option.value === semester)}
						menuPortalTarget={document.body}
						styles={{
							menuPortal: (base) => ({ ...base, zIndex: 999 }),
						}}
						onChange={(e: any) => {
							setSemester(e?.value);
						}}
					/>
				}
			/>
		</PageProvider>
	);
};

export default Semester;
