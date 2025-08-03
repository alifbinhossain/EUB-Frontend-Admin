import { useState } from 'react';
import { TableProvider } from '@/context';
import useAccess from '@/hooks/useAccess';

import { ToolbarComponent } from '@/components/core/data-table/_components/toolbar';
import ReactSelect from '@/components/ui/react-select';

import { itemRequestColumns } from '../log/config/columns';
import { IITemRequestTableData } from '../log/config/columns/columns.type';
import { useItemRequested } from '../log/config/query';

const getAccess = (pageAccess: string[]) => {
	if (pageAccess.includes('show_maintenance')) {
		return '&store_type=maintenance';
	} else if (pageAccess.includes('show_general')) {
		return '&store_type=general';
	} else if (pageAccess.includes('show_it_store')) {
		return '&store_type=it_store';
	} else {
		return '';
	}
};

const ItemRequestTable = () => {
	const pageAccess = useAccess('procurement__item_request') as string[];
	const [status, setStatus] = useState('pending');
	const { data, isLoading, refetch } = useItemRequested<IITemRequestTableData[]>(
		`status=${status}${getAccess(pageAccess)}`
	);

	const statusList = [
		{ value: '', label: 'All' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'complete', label: 'Complete' },
	];

	// Table Columns
	const columns = itemRequestColumns({ updateAcess: true, deleteAccess: true });

	return (
		<TableProvider
			title={'Item Request Data'}
			columns={columns}
			data={data ?? []}
			isLoading={isLoading}
			handleRefetch={refetch}
			enableDefaultColumns={false}
			otherToolBarComponents={
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
			}
			toolbarOptions={['advance-filter']}
			defaultVisibleColumns={{
				updated_at: false,
				created_at: false,
				item_work_order_id: false,
				actions: false,
			}}
		/>
	);
};

export default ItemRequestTable;
