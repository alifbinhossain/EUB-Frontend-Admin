import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Download } from 'lucide-react';
import useAccess from '@/hooks/useAccess';
import useAuth from '@/hooks/useAuth';

import { ToolbarComponent } from '@/components/core/data-table/_components/toolbar';
import { IFormSelectOption } from '@/components/core/form/types';
import { Button } from '@/components/ui/button';
import ReactSelect from '@/components/ui/react-select';

import { useOtherDepartments, useOtherSemester } from '@/lib/common-queries/other';
import { PageInfo } from '@/utils';

import BulkQrCode from '../../../components/pdf/fde-qr-bulk';
import { bulkQrColumns } from '../config/columns';
import { IFDEListTableData } from '../config/columns/columns.type';
import { useFDEList } from '../config/query';
import { statusList } from './utils';

const Semester = () => {
	const pageInfo = useMemo(() => new PageInfo('FDE/Bulk QR', '/fde/bulk-qr', 'fde__bulk_qr'), []);
	const { user } = useAuth();
	const pageAccess = useAccess('fde__evaluation') as string[];
	const show_all_teacher = pageAccess.includes('show_all_teacher');

	const [type, setType] = useState('mid');
	const [semesterUuid, setSemesterUuid] = useState<string | null>(null);
	const [departmentUuid, setDepartmentUuid] = useState<string | null>(null);
	const query = show_all_teacher
		? `status=pending&evaluation=${type}&semester_uuid=${semesterUuid}&department_uuid=${departmentUuid}`
		: `user_uuid=${user?.uuid}&status=pending&evaluation=${type}&semester_uuid=${semesterUuid}&department_uuid=${departmentUuid}`;

	const { data, isLoading, refetch } = useFDEList<IFDEListTableData[]>(query);

	const { data: semesterOptions } = useOtherSemester<IFormSelectOption[]>();
	const { data: departmentOptions } = useOtherDepartments<IFormSelectOption[]>();

	const handleBulkQr = async (data: IFDEListTableData[]) => {
		const fullURL = window.location.href;
		const slice = fullURL.split('f');
		const baseURl = slice[0];
		const baseLink = `${baseURl}fde`;
		(await BulkQrCode(baseLink, data, type)).print();
	};

	// Table Columns
	const columns = bulkQrColumns();

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
								<>
									<ReactSelect
										className='w-40'
										options={semesterOptions || []}
										value={semesterOptions?.find((option) => option.value === semesterUuid)}
										menuPortalTarget={document.body}
										styles={{
											menuPortal: (base) => ({ ...base, zIndex: 999 }),
										}}
										onChange={(e: any) => {
											setSemesterUuid(e?.value);
										}}
									/>
									<ReactSelect
										className='w-40'
										options={departmentOptions || []}
										value={departmentOptions?.find((option) => option.value === departmentUuid)}
										menuPortalTarget={document.body}
										styles={{
											menuPortal: (base) => ({ ...base, zIndex: 999 }),
										}}
										onChange={(e: any) => {
											setDepartmentUuid(e?.value);
										}}
									/>
									<ReactSelect
										options={statusList || []}
										value={statusList?.find((option) => option.value === type)}
										menuPortalTarget={document.body}
										styles={{
											menuPortal: (base) => ({ ...base, zIndex: 999 }),
										}}
										onChange={(e: any) => {
											setType(e?.value);
										}}
									/>
									<Button type='button' onClick={() => handleBulkQr(data || [])}>
										<Download size={20} />
										Bulk QR
									</Button>
								</>
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
