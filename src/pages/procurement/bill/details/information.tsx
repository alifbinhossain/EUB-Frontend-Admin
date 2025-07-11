import React from 'react';

import StatusButton from '@/components/buttons/status';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { IBillTableData } from '../config/columns/columns.type'; // TODO: update data type

const Information: React.FC<{ data: IBillTableData }> = ({ data }) => {
	const renderHeaderItems = (): ITableListItems => {
		return [
			{
				label: 'Completed',
				value: <StatusButton value={data?.is_completed as boolean} />,
			},
			{
				label: 'Vendor',
				value: data.vendor_name,
			},
			// {
			// 	label: 'Bank',
			// 	value: data.bank_name,
			// },
			{
				label: 'Remarks',
				value: data.remarks,
			},
		];
	};
	const renderHeaderItems2 = (): ITableListItems => {
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
				value: formatDateTable(data.updated_at),
			},
		];
	};

	return (
		<>
			<SectionContainer title={'General Information'}>
				<div className='grid grid-cols-2 gap-2'>
					<TableList items={renderHeaderItems()} />
					<TableList items={renderHeaderItems2()} />
				</div>
			</SectionContainer>
		</>
	);
};

export default Information;
