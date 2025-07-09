import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IBillTableData } from '../config/columns/columns.type';
import { useBillByDetails } from '../config/query';
import Information from './information';
import Table from './table';

const Index = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useBillByDetails(uuid as string);

	useEffect(() => {
		document.title = 'Bill Details';
	}, []);
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IBillTableData} />
			<Table data={(data || []) as IBillTableData} isLoading={isLoading} />
		</div>
	);
};

export default Index;
