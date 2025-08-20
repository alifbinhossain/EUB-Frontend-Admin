import { useState } from 'react';
import { TableProvider } from '@/context';
import useAccess from '@/hooks/useAccess';

import { ToolbarComponent } from '@/components/core/data-table/_components/toolbar';
import ReactSelect from '@/components/ui/react-select';

import { itemRequestColumns } from '../log/config/columns';
import { IITemRequestTableData } from '../log/config/columns/columns.type';
import { useItemRequested } from '../log/config/query';

const getAccess = (pageAccess: string[]) => {
	const types: string[] = [];

	if (pageAccess.includes('show_maintenance')) {
		types.push('maintenance');
	}
	if (pageAccess.includes('show_general')) {
		types.push('general');
	}
	if (pageAccess.includes('show_it_store')) {
		types.push('it_store');
	}

	return types.length > 0 ? `store_type=${types.join(',')}` : '';
};

const ItemRequestTable = () => {
	const pageAccess = useAccess('procurement__item') as string[];
	const [status, setStatus] = useState('pending');
	const { data, isLoading, refetch } = useItemRequested<IITemRequestTableData[]>(
		`status=${status}&${getAccess(pageAccess)}`
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
			title={'Item Request'}
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
