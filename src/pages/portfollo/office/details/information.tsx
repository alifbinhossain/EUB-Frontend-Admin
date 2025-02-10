import React from 'react';

import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { API_IMAGE_URL } from '@/lib/secret';
import { formatDateTable } from '@/utils/formatDate';

import { IOfficeTableData } from '../../_config/columns/columns.type'; // TODO: update data type
import { categories as officeCategories } from '../utills';

const Information: React.FC<{ data: IOfficeTableData }> = ({ data }) => {
	const renderItems = (): ITableListItems => {
		return [
			{
				label: 'ID',
				value: data.id,
			},
			{ label: 'Title', value: data.title },
			{
				label: 'Category',
				value: (
					<span className='capitalize'>
						{officeCategories.find((item) => item.value === data.category)?.label ?? ''}
					</span>
				),
			},
			{
				label: 'Image',
				value: <img className='h-10 w-10 rounded-full' src={API_IMAGE_URL + data.image} alt='' />,
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
			{ label: 'Remarks', value: data.remarks },
		];
	};

	return (
		<SectionContainer title={'Information'}>
			<TableList items={renderItems()} />
		</SectionContainer>
	);
};

export default Information;
