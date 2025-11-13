import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherItem } from '@/lib/common-queries/other';

import { ITicket } from './config/schema';

interface IGenerateFieldDefsProps {
	data: ITicket;
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch: UseFormWatch<ITicket>;
	isUpdate: boolean;
	isNew: boolean;
	isResolved: boolean;
}

const useGenerateTicketEntry = ({ remove, copy, watch, data, isResolved }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: itemData } = useOtherItem<IFormSelectOption[]>();

	return [
		{
			header: 'Index',
			accessorKey: 'index',
			type: 'custom',
			component: (index: number) => {
				return <span className='items-center justify-center'>{index + 1}</span>;
			},
		},
		{
			header: 'Item',
			accessorKey: 'item_uuid',
			type: 'select',
			options: itemData || [],
			unique: true,
			disabled: isResolved,
			excludeOptions:
				data.req_ticket_item
					?.map((entry: { item_uuid?: string }) => entry.item_uuid)
					.filter((uuid: string | undefined): uuid is string => uuid !== undefined) || [],
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'join-input-unit',
			inputType: 'number',
			disabled: isResolved,
			unit: (index: number) =>
				itemData?.find((item) => item.value === watch(`req_ticket_item.${index}.item_uuid`))?.unit ?? '',
		},
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'textarea',
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} hidden={isResolved} />;
			},
		},
	];
};

export default useGenerateTicketEntry;
