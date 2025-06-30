import { format } from 'path';
import React from 'react';

import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';
import DateTime from '@/components/ui/date-time';

import { formatDateTable } from '@/utils/formatDate';

import { IProcureStoreTableData } from '../config/columns/columns.type'; // TODO: update data type

const Information: React.FC<{ data: IProcureStoreTableData }> = ({ data }) => {
	const renderHeaderItems = (): ITableListItems => {
		return [
			{
				label: 'Vendor',
				value: data.vendor_name,
			},
			{
				label: 'Bill ID',
				value: data.bill_id,
			},
			{
				label: 'Date',
				value: data.done_date && <DateTime date={new Date(data.done_date)} isTime={false} />,
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
	const renderHeaderItems3 = (): ITableListItems => {
		return [
			{
				label: 'Remarks',
				value: data.delivery_statement_remarks,
			},
			{
				label: 'Date',
				value: data.delivery_statement_date ? (
					<DateTime date={new Date(data.delivery_statement_date)} isTime={false} />
				) : (
					'-'
				),
			},
		];
	};

	return (
		<>
			<SectionContainer title={'General Information'}>
				<div className='grid grid-cols-3 gap-2'>
					<TableList title='Work Order' items={renderHeaderItems()} />
					<TableList title='Created and Updated Information' items={renderHeaderItems2()} />
					<TableList title='Delivery Information' items={renderHeaderItems3()} />
				</div>
			</SectionContainer>
		</>
	);
};

export default Information;
