import React from 'react';
import { format } from 'date-fns';

import StatusButton from '@/components/buttons/status';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';
import { formatDateTable } from '@/utils/formatDate';

import { ICapitalTableData } from '../config/columns/columns.type'; // TODO: update data type

const Information: React.FC<{ data: ICapitalTableData }> = ({ data }) => {
	const renderHeaderITems = (): ITableListItems => {
		return [
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
				label: 'Status',
				value: (
					<Badge
						className={cn(
							data.status === 'Requested' && 'bg-red-500 text-white',
							data.status === 'Pipeline' && 'bg-yellow-500 text-white',
							data.status === 'Decided' && 'bg-blue-500 text-white',
							data.status === 'Committed' && 'bg-teal-500 text-white',
							data.status === 'Paid' && 'bg-green-500 text-white'
						)}
					>
						{data.status as string}
					</Badge>
				),
			},
			{
				label: 'Value',
				value: data.value,
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

	const renderCsITems = (): ITableListItems => {
		return [
			{
				label: 'Status',
				value: <StatusButton value={data.is_cs as boolean} />,
			},
			{
				label: 'Remarks',
				value: data.cs_remarks,
			},
		];
	};

	const renderMonthlyMeetingITems = (): ITableListItems => {
		return [
			{
				label: 'Status',
				value: <StatusButton value={data.is_monthly_meeting as boolean} />,
			},
			{
				label: 'Remarks',
				value: data.monthly_meeting_remarks,
			},
		];
	};

	const renderWorkOrderITems = (): ITableListItems => {
		return [
			{
				label: 'Status',
				value: <StatusButton value={data.is_work_order as boolean} />,
			},
			{
				label: 'Remarks',
				value: data.work_order_remarks,
			},
		];
	};

	const renderDeliveryStatementITems = (): ITableListItems => {
		return [
			{
				label: 'Status',
				value: <StatusButton value={data.is_delivery_statement as boolean} />,
			},
			{
				label: 'Remarks',
				value: data.delivery_statement_remarks,
			},
		];
	};

	// const renderPersonalITems = (): ITableListItems => {
	// 	return [
	// 		{
	// 			label: 'Father Name',
	// 			value: data.father_name,
	// 		},
	// 		{ label: 'Mother Name', value: data.mother_name },
	// 		{
	// 			label: 'Local Guardian',
	// 			value: data.local_guardian,
	// 		},
	// 		{
	// 			label: 'Gender',
	// 			value: data?.gender,
	// 		},
	// 		{
	// 			label: 'Marital Status',
	// 			value: data.marital_status,
	// 		},
	// 		{
	// 			label: 'Date Of Birth',
	// 			value: format(data.date_of_birth, 'dd/MM/yyyy'),
	// 		},
	// 		{
	// 			label: 'Phone Number',
	// 			value: data.phone_number,
	// 		},
	// 		{
	// 			label: 'Email',
	// 			value: data.email,
	// 		},
	// 		{
	// 			label: 'Bkash',
	// 			value: data.bkash,
	// 		},
	// 		{
	// 			label: 'Blood Group',
	// 			value: data.blood_group,
	// 		},
	// 		{
	// 			label: 'Nationality',
	// 			value: data.nationality,
	// 		},
	// 	];
	// };

	// const renderAddressITems = (): ITableListItems => {
	// 	return [
	// 		{
	// 			label: 'Address',
	// 			value: data.present_address,
	// 		},
	// 		{ label: 'Village', value: data.village },
	// 		{
	// 			label: 'Post Office',
	// 			value: data.post_office,
	// 		},
	// 		{
	// 			label: 'Thana',
	// 			value: data?.thana,
	// 		},
	// 		{
	// 			label: 'District',
	// 			value: data.district,
	// 		},
	// 	];
	// };

	return (
		<>
			<SectionContainer title={'General Information'}>
				<div className='grid grid-cols-2 gap-2'>
					<TableList title='Basic Information' items={renderHeaderITems()} />
					<div className='grid grid-cols-2'>
						<TableList title='CS' items={renderCsITems()} />
						<TableList title='Monthly Meeting' items={renderMonthlyMeetingITems()} />
						<TableList title='Work Order' items={renderWorkOrderITems()} />
						<TableList title='Delivery Statement' items={renderDeliveryStatementITems()} />
					</div>
				</div>
			</SectionContainer>
		</>
	);
};

export default Information;
