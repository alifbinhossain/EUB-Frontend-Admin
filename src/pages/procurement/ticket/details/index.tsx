import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { ITicketTableData } from '../config/columns/columns.type';
import { useTicketDetails } from '../config/query';
import Information from './information';
import Table from './table';

const Index = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useTicketDetails(uuid as string);

	useEffect(() => {
		document.title = 'Ticket Details';
	}, []);
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className='space-y-8'>
			<Information data={(data || []) as ITicketTableData} />
			<Table data={(data || []) as ITicketTableData} isLoading={isLoading} />
		</div>
	);
};

export default Index;
