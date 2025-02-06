import React from 'react';

import StatusButton from '@/components/buttons/status';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { IOrderTableData } from '../../_config/columns/columns.type';

const Information: React.FC<{ data: IOrderTableData }> = ({ data }) => {
	const renderGeneralItems = (): ITableListItems => {
		return [
			{
				label: 'ID',
				value: data.order_id,
			},
			{ label: 'User Name', value: data.user_name },
			{ label: 'User ID', value: data.user_id },
			{
				label: 'Phone No',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Created At',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Updated At',
				value: formatDateTable(data.updated_at),
			},
			{ label: 'Remarks', value: data.remarks },
		];
	};
	const renderProductItems = (): ITableListItems => {
		return [
			{ label: 'Brand', value: data.brand_name },
			{ label: 'Model', value: data.model_name },
			{
				label: 'Size',
				value: data.size_name,
			},
			{ label: 'Serial', value: data.serial_no },
		];
	};
	const renderProblemItems = (): ITableListItems => {
		return [
			{
				label: 'Problems',
				value: data.problems_name,
			},
			{ label: 'Statement', value: data.problem_statement },
		];
	};

	const renderStatusItems = (): ITableListItems => {
		return [
			{
				label: 'Received',
				value: <StatusButton value={data.is_product_received as boolean} />,
			},
			{
				label: 'Receiving Date',
				value: formatDateTable(data.receive_date),
			},
			{
				label: 'Accessories',
				value: (
					<div className='flex flex-wrap gap-1'>
						{(data.accessories as string[])?.map((item, index) => (
							<span key={index} className='rounded-[10px] bg-accent px-2 py-1 capitalize text-white'>
								{item.replace(/_/g, ' ')}
							</span>
						))}
					</div>
				),
			},
		];
	};

	const renderLocationItems = (): ITableListItems => {
		return [
			{
				label: 'Warehouse',
				value: data.warehouse_name,
			},
			{
				label: 'Rack',
				value: data.rack_name,
			},
			{
				label: 'Floor',
				value: data.floor_name,
			},
			{
				label: 'Box',
				value: data.box_name,
			},
		];
	};
	const renderDiagnosisItems = (): ITableListItems => {
		return [
			{
				label: 'Problem',
				value: data.diagnosis?.problems_name,
			},
			{
				label: 'Statement',
				value: data.diagnosis?.problem_statement,
			},
			{
				label: 'Proceed to Repair',
				value: <StatusButton value={data.diagnosis?.is_proceed_to_repair as boolean} />,
			},
			{
				label: 'Status Update Date',
				value: data.diagnosis?.status_update_date && formatDateTable(data.diagnosis?.status_update_date),
			},
		];
	};

	return (
		<>
			<SectionContainer title={'Customer'}>
				<div className='flex'>
					<TableList title='General' className='flex-1' items={renderGeneralItems()} />
					<TableList title='Product' className='flex-1' items={renderProductItems()} />
					<TableList title='Problem' className='flex-1' items={renderProblemItems()} />
					<TableList title='Status' className='flex-1' items={renderStatusItems()} />
					<TableList title='Location' className='flex-1' items={renderLocationItems()} />
				</div>
			</SectionContainer>
			<SectionContainer title={'Diagnosis'}>
				<TableList title='Diagnosis' items={renderDiagnosisItems()} />
			</SectionContainer>
		</>
	);
};

export default Information;
