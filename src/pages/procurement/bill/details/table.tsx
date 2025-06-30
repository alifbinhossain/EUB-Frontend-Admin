import { TableProvider } from '@/context';

import DataTable from '@/components/core/data-table';
import DataTableEntry from '@/components/core/data-table/entry';

import { billPaymentColumns, itemWorkOrderColumns } from '../config/columns';
import { IBillTableData } from '../config/columns/columns.type';

const Table: React.FC<{ data: IBillTableData; isLoading: boolean }> = ({ data, isLoading }) => {
	const columnsQ = itemWorkOrderColumns();
	const columnsG = billPaymentColumns();

	const total_item_work_order = data?.item_work_order.reduce((acc, item) => acc + item.total_amount, 0);
	const total_bill_payment = data?.bill_payment.reduce((acc, item) => acc + item.amount, 0);

	return (
		<div className='flex flex-col gap-4'>
			<DataTableEntry title={'Item Work Order'} columns={columnsQ} data={data?.item_work_order ?? []}>
				<tr>
					<td colSpan={1} className='text-right font-semibold'>
						Grand Total:
					</td>
					<td className='px-3 py-2'>{total_item_work_order}</td>
				</tr>
			</DataTableEntry>
			<DataTableEntry title={'Bill Payment'} columns={columnsG} data={data.bill_payment ?? []}>
				<tr>
					<td colSpan={1} className='text-right font-semibold'>
						Grand Total:
					</td>
					<td className='px-3 py-2'>{total_bill_payment}</td>
				</tr>
			</DataTableEntry>
		</div>
	);
};

export default Table;
