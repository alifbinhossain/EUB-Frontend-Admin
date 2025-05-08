import { TableProvider } from '@/context';

import { servicePaymentColumns } from '../config/columns';
import { IServiceTableData } from '../config/columns/columns.type';

const Table: React.FC<{ data: IServiceTableData; isLoading: boolean }> = ({ data, isLoading }) => {
	const columns = servicePaymentColumns();

	return (
		<div className='flex flex-col gap-4'>
			<TableProvider
				title={'Service Payment'}
				columns={columns}
				data={data.service_payment ?? []}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default Table;
