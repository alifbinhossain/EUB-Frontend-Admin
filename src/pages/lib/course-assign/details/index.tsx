import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IItemWorkOrderTableData } from '../config/columns/columns.type';
import { useItemWorkOrderAndEntry } from '../config/query';
import Information from './information';
import Table from './table';

const Index = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useItemWorkOrderAndEntry(uuid as string);

	useEffect(() => {
		document.title = 'Capital Details';
	}, []);
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IItemWorkOrderTableData} />
			<Table data={(data || []) as IItemWorkOrderTableData} isLoading={isLoading} />
		</div>
	);
};

export default Index;
