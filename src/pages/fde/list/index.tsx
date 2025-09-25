import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAccess from '@/hooks/useAccess';
import useAuth from '@/hooks/useAuth';

import { ToolbarComponent } from '@/components/core/data-table/_components/toolbar';
import { IFormSelectOption } from '@/components/core/form/types';
import ReactSelect from '@/components/ui/react-select';

import { useOtherSemester } from '@/lib/common-queries/other';
import { getDateTime, PageInfo } from '@/utils';

import { default as ChallanPdfV2, default as QrCode } from '../../../components/pdf/fde-qr-code';
import { fdeListColumns } from '../config/columns';
import { IFDEListTableData } from '../config/columns/columns.type';
import { useFDEList } from '../config/query';
import { statusList } from './utils';

const Semester = () => {
	const pageInfo = useMemo(() => new PageInfo('FDE/Evaluation', '/lib/sem-crs-thr-entry', 'fde__evaluation'), []);
	const { user } = useAuth();
	const pageAccess = useAccess('fde__evaluation') as string[];
	const show_all_teacher = pageAccess.includes('show_all_teacher');

	const [status, setStatus] = useState('pending');
	const [semesterUuid, setSemesterUuid] = useState<string | null>(null);
	const query = show_all_teacher
		? `status=${status}&semester_uuid=${semesterUuid}`
		: `user_uuid=${user?.uuid}&status=${status}&semester_uuid=${semesterUuid}`;
	// const query = `status=${status}`;
	const { data, isLoading, updateData, refetch } = useFDEList<IFDEListTableData[]>(query);

	const { data: departmentOptions } = useOtherSemester<IFormSelectOption[]>();

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
	const handleQRClick = async (row: Row<IFDEListTableData>, type: 'mid' | 'final') => {
		const fullURL = window.location.href;
		const slice = fullURL.split('f');
		const baseURl = slice[0];
		const link = `${baseURl}fde/${row.original?.uuid}/${type}`;
		(await ChallanPdfV2(link, row.original, type)).print();
	};
	// Table Columns
	const columns = fdeListColumns({ handleMidEvolution, handleFinalEvolution, handleQRClick });

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleRefetch={refetch}
				otherToolBarComponents={
					<div className='flex gap-2'>
						<ToolbarComponent
							option='other'
							render={() => (
								<ReactSelect
									options={departmentOptions || []}
									value={departmentOptions?.find((option) => option.value === semesterUuid)}
									menuPortalTarget={document.body}
									styles={{
										menuPortal: (base) => ({ ...base, zIndex: 999 }),
									}}
									onChange={(e: any) => {
										setSemesterUuid(e?.value);
									}}
								/>
							)}
						/>
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
					</div>
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
