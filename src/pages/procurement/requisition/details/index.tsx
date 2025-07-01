import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import OrderSheetPdf from '../../../../components/pdf/item-requstion';
import { IRequisitionTableData } from '../config/columns/columns.type';
import { useRequisitionAndItemByUUID, useRequisitionAndItemForPDF } from '../config/query';
import Information from './information';
import Table from './table';

const Index = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useRequisitionAndItemByUUID<IRequisitionTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Requisition Details';
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
			<Information data={(data || []) as IRequisitionTableData} />
			<Table data={(data || []) as IRequisitionTableData} isLoading={isLoading} />
		</div>
	);
};

export default Index;
