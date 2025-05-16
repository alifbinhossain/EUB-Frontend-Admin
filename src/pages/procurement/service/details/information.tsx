import React from 'react';
import { format } from 'date-fns';

import StatusButton from '@/components/buttons/status';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { IServiceTableData } from '../config/columns/columns.type'; // TODO: update data type

const Information: React.FC<{ data: IServiceTableData }> = ({ data }) => {
	const renderHeaderITems = (): ITableListItems => {
		return [
			{
				label: 'Id',
				value: data.id,
			},
			{
				label: 'Name',
				value: data.name,
			},
			{
				label: 'Vendor',
				value: data.vendor_name,
			},
			{
				label: 'Sub Category',
				value: data.sub_category_name,
			},
			{
				label: 'Description',
				value: data.description,
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
				value: data.updated_at ? formatDateTable(data.updated_at) : '---',
			},
		];
	};

	const renderMoreITems = (): ITableListItems => {
		return [
			{
				label: 'Frequency/Year',
				value: data.frequency,
			},
			{
				label: 'Status',
				value: data.status,
			},
			{
				label: 'Approval Required',
				value: <StatusButton value={data.approval_required as boolean} />,
			},
			{
				label: 'Start Date',
				value: formatDateTable(data.start_date),
			},
			{
				label: 'End Date',
				value: formatDateTable(data.end_date),
			},
			{
				label: 'Cost Per Service',
				value: data.cost_per_service,
			},
			{
				label: 'Payment Terms',
				value: data.payment_terms,
			},
		];
	};

	return (
		<>
			<SectionContainer title={'General Information'}>
				<div className='grid grid-cols-2 gap-4'>
					<TableList title='Basic Information' items={renderHeaderITems()} />
					<TableList title='More Information' items={renderMoreITems()} />
				</div>
			</SectionContainer>
		</>
	);
};

export default Information;
