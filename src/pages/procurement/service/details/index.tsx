import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IServiceTableData } from '../config/columns/columns.type';
import { useServiceDetails } from '../config/query';
import Information from './information';
import Table from './table';

const Index = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useServiceDetails(uuid as string);

	useEffect(() => {
		document.title = 'Service Details';
	}, []);
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IServiceTableData} />
			<Table data={(data || []) as IServiceTableData} isLoading={isLoading} />
		</div>
	);
};

export default Index;
