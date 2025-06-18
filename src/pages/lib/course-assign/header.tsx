import { useParams } from 'react-router-dom';

import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { ISemesterTableData } from '../config/columns/columns.type'; // TODO: update data type
import { useFDESemesterByUUID } from '../config/query';

const Header = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useFDESemesterByUUID<ISemesterTableData>(uuid as string);
	const renderHeaderITems = (): ITableListItems => {
		return [
			{
				label: 'Semester',
				value: data?.name,
			},
			{
				label: 'Started',
				value: data?.started_at && formatDateTable(data.started_at),
			},
			{
				label: 'Mid Started',
				value: data?.mid_started_at && formatDateTable(data.mid_started_at),
			},
			{
				label: 'Final Started',
				value: data?.final_started_at && formatDateTable(data.final_started_at),
			},
			{
				label: 'Ended',
				value: data?.ended_at && formatDateTable(data.ended_at),
			},
			// {
			// 	label: 'Remarks',
			// 	value: data?.remarks,
			// },
		];
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<SectionContainer title={'Semester'}>
			<div className='grid grid-cols-1 gap-4'>
				<TableList items={renderHeaderITems()} />
			</div>
		</SectionContainer>
	);
};

export default Header;
