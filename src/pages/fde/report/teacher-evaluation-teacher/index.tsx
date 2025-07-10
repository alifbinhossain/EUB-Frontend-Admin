import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';

import { IFormSelectOption } from '@/components/core/form/types';
import ReactSelect from '@/components/ui/react-select';
import CoreForm from '@core/form';

import { useOtherDepartments, useOtherTeachers } from '@/lib/common-queries/other';
import { PageInfo } from '@/utils';

import { teacherEvaluationTeacherColumns } from '../config/columns';
import { IReportTeacherEvaluationTeacherTableData } from '../config/columns/columns.type';
import { useFDEReportTeacherEvaluationTeacher } from '../config/query';

const Semester = () => {
	const [department, setDepartment] = useState('');
	const [teacher, setTeacher] = useState('');

	const { data, isLoading, url, refetch } = useFDEReportTeacherEvaluationTeacher<
		IReportTeacherEvaluationTeacherTableData[]
	>(department, teacher);
	const { data: departmentOptions } = useOtherDepartments<IFormSelectOption[]>();
	const { data: teacherOptions } = useOtherTeachers<IFormSelectOption[]>(
		department ? `department_uuid=${department}` : ''
	);

	const pageInfo = useMemo(
		() => new PageInfo('FDE/Report/Teacher Evaluation (Teacher)', url, 'fde__report_teacher_evaluation_teacher'),
		[url]
	);

	// Table Columns
	const columns = teacherEvaluationTeacherColumns();

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
						<ReactSelect
							placeholder='Select Teacher'
							options={teacherOptions || []}
							value={teacherOptions?.find((option) => option.value === teacher)}
							menuPortalTarget={document.body}
							styles={{
								menuPortal: (base) => ({ ...base, zIndex: 999 }),
							}}
							onChange={(e: any) => {
								setTeacher(e?.value);
							}}
						/>
					</div>
				}
			/>
		</PageProvider>
	);
};

export default Semester;
