import { ITableFacetedFilter } from '@/types';

export const ticketFacetedFilters: ITableFacetedFilter[] = [
	{
		id: 'department',
		title: 'Department',
		options: [
			{
				label: 'Maintenance',
				value: 'maintenance',
			},
			{
				label: 'IT',
				value: 'IT',
			},
		],
	},
	{
		id: 'is_resolved',
		title: 'Resolved',
		options: [
			{
				label: 'Resolved',
				value: 'true',
			},
			{
				label: 'Not Resolved',
				value: 'false',
			},
		],
	},
];
