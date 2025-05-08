import { TableProvider } from '@/context';

import { itemWorkOrderEntry } from '../config/columns';
import { IItemWorkOrderTableData } from '../config/columns/columns.type';

const Table: React.FC<{ data: IItemWorkOrderTableData; isLoading: boolean }> = ({ data, isLoading }) => {
	const columns = itemWorkOrderEntry();

	return (
		<div className='flex flex-col gap-4'>
			<TableProvider
				title={'Item Work Order Entry'}
				columns={columns}
				data={data.item_work_order_entry ?? []}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default Table;
