import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IAdmissionTableData } from '../../_config/columns/columns.type';
import { usePortfolioAdmissionByUUID } from '../../_config/query'; // TODO: replace with details query
import OrderSheetPdf from '../../../../components/pdf/application-form';
import Information from './information';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading } = usePortfolioAdmissionByUUID<IAdmissionTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Admission Details';
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
			<Information data={(data || []) as IAdmissionTableData} />
		</div>
	);
};

export default DetailsPage;
