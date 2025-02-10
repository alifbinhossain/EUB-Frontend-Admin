import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IOfficeTableData } from '../../_config/columns/columns.type';
import { usePortfolioOfficeByUUID } from '../../_config/query'; // TODO: replace with details query

import EntryTable from './entry-table';
import Information from './information';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading } = usePortfolioOfficeByUUID<IOfficeTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Purchase Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IOfficeTableData} />
			<EntryTable data={(data || []) as IOfficeTableData} />
		</div>
	);
};

export default DetailsPage;
