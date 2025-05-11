import { TableProvider } from '@/context';

import { generalNotesColumns, quotationsColumns } from '../config/columns';
import { ICapitalTableData } from '../config/columns/columns.type';

const Table: React.FC<{ data: ICapitalTableData; isLoading: boolean }> = ({ data, isLoading }) => {
	const columnsQ = quotationsColumns();
	const columnsG = generalNotesColumns();

	return (
		<div className='flex flex-col gap-4'>
			<TableProvider title={'Quotations'} columns={columnsQ} data={data.quotations ?? []} isLoading={isLoading} />
			<TableProvider
				title={'General Notes'}
				columns={columnsG}
				data={data.general_notes ?? []}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default Table;
