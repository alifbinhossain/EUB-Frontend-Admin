import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherItem } from '@/lib/common-queries/other';

import { IRequisition } from './config/schema';

interface IGenerateFieldDefsProps {
	data: IRequisition;
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IRequisition>; // TODO: Update Schema Type
	isUpdate: boolean;
	request?: boolean;
	provider?: boolean;
}

const useGenerateFieldDefs = ({ data, copy, remove, request, provider }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: itemList } = useOtherItem<IFormSelectOption[]>();

	return [
		{
			header: 'Item',
			accessorKey: 'item_uuid',
			type: 'select',
			placeholder: 'Select Item',
			options: itemList || [],
			unique: true,
			excludeOptions: data.item_requisition.map((item) => item.item_uuid) || [],
			disabled: provider,
		},
		{
			header: 'Request Quantity',
			accessorKey: 'req_quantity',
			type: 'number',
			disabled: provider,
		},
		{
			header: 'Provided Quantity',
			accessorKey: 'provided_quantity',
			type: 'number',
			disabled: request,
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
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
