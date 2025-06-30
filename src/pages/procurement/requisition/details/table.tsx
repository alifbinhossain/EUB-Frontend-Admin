import DataTableEntry from '@/components/core/data-table/entry';

import { itemRequisition } from '../config/columns';
import { IRequisitionTableData } from '../config/columns/columns.type';

const Table: React.FC<{ data: IRequisitionTableData; isLoading: boolean }> = ({ data, isLoading }) => {
	const columnsQ = itemRequisition();

	return (
		<div className='flex flex-col gap-4'>
			<DataTableEntry
				title={'Item Work Order Entry'}
				columns={columnsQ}
				data={data?.item_requisition ?? []}
				defaultVisibleColumns={{ created_by_name: false, created_at: false, updated_at: false }}
			></DataTableEntry>
		</div>
	);
};

export default Table;
