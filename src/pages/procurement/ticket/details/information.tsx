import React from 'react';

import StatusButton from '@/components/buttons/status';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { ITicketTableData } from '../config/columns/columns.type';

const Information: React.FC<{ data: ITicketTableData }> = ({ data }) => {
	const renderHeaderITems = (): ITableListItems => {
		return [
			{
				label: 'ID',
				value: data.req_ticket_id,
			},
			{
				label: 'Department',
				value: data.department,
			},
			{
				label: 'Problem Description',
				value: data.problem_description,
			},
			{
				label: 'Resolved',
				value: <StatusButton value={data.is_resolved as boolean} />,
			},
		];
	};

	const renderMoreITems = (): ITableListItems => {
		return [
			{
				label: 'Created By',
				value: data.created_by_name,
			},
			{
				label: 'Created At',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Updated At',
				value: data.updated_at ? formatDateTable(data.updated_at) : '---',
			},
		];
	};

	return (
		<>
			<SectionContainer title={'General Information'}>
				<div className='grid grid-cols-2 gap-4'>
					<TableList title='Basic Information' items={renderHeaderITems()} />
					<TableList title='Additional Information' items={renderMoreITems()} />
				</div>
			</SectionContainer>
		</>
	);
};

export default Information;
