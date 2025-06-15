import React from 'react';
import { format } from 'date-fns';

import StatusButton from '@/components/buttons/status';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { IItemWorkOrderTableData } from '../config/columns/columns.type'; // TODO: update data type

const Information: React.FC<{ data: IItemWorkOrderTableData }> = ({ data }) => {
	const renderHeaderITems = (): ITableListItems => {
		return [
			{
				label: 'Vendor',
				value: data.vendor_name,
			},
			{
				label: 'Status',
				value: data.status,
			},
			{
				label: 'Remarks',
				value: data.remarks,
			},
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
				value: formatDateTable(data.updated_at),
			},
		];
	};

	return (
		<>
			<SectionContainer title={'General Information'}>
				<div className='grid grid-cols-1 gap-4'>
					<TableList title='Basic Information' items={renderHeaderITems()} />
				</div>
			</SectionContainer>
		</>
	);
};

export default Information;
