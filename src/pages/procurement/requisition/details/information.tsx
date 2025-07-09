import { format } from 'path';
import React from 'react';

import StatusButton from '@/components/buttons/status';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';
import DateTime from '@/components/ui/date-time';

import { formatDateTable } from '@/utils/formatDate';

import { IRequisitionTableData } from '../config/columns/columns.type'; // TODO: update data type

const Information: React.FC<{ data: IRequisitionTableData }> = ({ data }) => {
	const renderHeaderItems = (): ITableListItems => {
		return [
			{
				label: 'ID',
				value: data.requisition_id,
			},
			{
				label: 'Store Received',
				value: <StatusButton value={data?.is_store_received as boolean} />,
			},
			{
				label: 'Store Received Date',
				value: data.store_received_date && (
					<DateTime date={new Date(data.store_received_date)} isTime={false} />
				),
			},
			{
				label: 'PI Generated Number',
				value: data.pi_generated_number,
			},
			{
				label: 'Received',
				value: <StatusButton value={data?.is_received as boolean} />,
			},
			{
				label: 'Received Date',
				value: data.received_date && <DateTime date={new Date(data.received_date)} isTime={false} />,
			},

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
					<TableList title='Work Order' items={renderHeaderItems()} />
					<TableList title='Created and Updated Information' items={renderHeaderItems2()} />
				</div>
			</SectionContainer>
		</>
	);
};

export default Information;
