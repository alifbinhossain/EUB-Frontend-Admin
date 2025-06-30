import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IProcureStoreTableData } from '../config/columns/columns.type';
import { useItemWorkOrderByDetails } from '../config/query';
import Information from './information';
import Table from './table';

const Index = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useItemWorkOrderByDetails<IProcureStoreTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Procure Store Details';
	}, []);
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IProcureStoreTableData} />
			<Table data={(data || []) as IProcureStoreTableData} isLoading={isLoading} />
		</div>
	);
};

export default Index;
