import { useMemo } from 'react';
import { TableProvider } from '@/context';

import { ticketEntryColumns } from '../config/columns';
import { ITicketTableData } from '../config/columns/columns.type';

const Table: React.FC<{ data: ITicketTableData; isLoading: boolean }> = ({ data, isLoading }) => {
	const ticketEntries = useMemo(() => {
		if (!data) return [];
		return data.req_ticket_item || [];
	}, [data]);

	const columns = ticketEntryColumns();

	return (
		<div className='flex flex-col gap-4'>
			<TableProvider title={'Ticket Entry'} columns={columns} data={ticketEntries} isLoading={isLoading} />
		</div>
	);
};

export default Table;
