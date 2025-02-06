import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IOrderTableData } from '../../_config/columns/columns.type';
import {useWorkOrderByDetails } from '../../_config/query';
import Information from './information';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useWorkOrderByDetails<IOrderTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Order Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IOrderTableData} />
		</div>
	);
};

export default DetailsPage;
