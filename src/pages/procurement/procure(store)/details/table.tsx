import DataTableEntry from '@/components/core/data-table/entry';

import { itemWorkOrderEntry } from '../config/columns';
import { IProcureStoreTableData } from '../config/columns/columns.type';

const Table: React.FC<{ data: IProcureStoreTableData; isLoading: boolean }> = ({ data, isLoading }) => {
	const columnsQ = itemWorkOrderEntry();

	const total_item_work_order = data?.item_work_order_entry.reduce(
		(acc, item) => acc + item.provided_quantity * item.unit_price,
		0
	);

	return (
		<div className='flex flex-col gap-4'>
			<DataTableEntry
				title={'Item Work Order Entry'}
				columns={columnsQ}
				data={data?.item_work_order_entry ?? []}
				defaultVisibleColumns={{ created_by_name: false, created_at: false, updated_at: false }}
			>
				<tr>
					<td colSpan={4} className='text-right font-semibold'>
						Grand Total:
					</td>
					<td className='px-3 py-2'>{total_item_work_order}</td>
				</tr>
			</DataTableEntry>
		</div>
	);
};

export default Table;
