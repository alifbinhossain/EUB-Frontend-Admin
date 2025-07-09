import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import OrderSheetPdf from '../../../../components/pdf/procure-store';
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

	const [data2, setData] = useState('');
	useEffect(() => {
		if (data) {
			OrderSheetPdf(data)?.getDataUrl((dataUrl) => {
				setData(dataUrl);
			});
		}
	}, [data]);

	if (isLoading) return <div>Loading...</div>;
	return (
		<div className='space-y-8'>
			<iframe src={data2} className='h-[40rem] w-full rounded-md border-none' />
			<Information data={(data || []) as IProcureStoreTableData} />
			<Table data={(data || []) as IProcureStoreTableData} isLoading={isLoading} />
		</div>
	);
};

export default Index;
