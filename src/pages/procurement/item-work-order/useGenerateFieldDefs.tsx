import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherVendor } from '@/lib/common-queries/other';

import { IItemWorkOrder } from './config/schema';

interface IGenerateFieldDefsProps {
	remove: (index: number) => void;
	watch?: UseFormWatch<IItemWorkOrder>; // TODO: Update Schema Type
	isUpdate: boolean;
	isNew: boolean;
}

const useGenerateFieldDefs = ({ remove, isUpdate, isNew }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Item',
			accessorKey: 'name',
			type: 'text',
			disabled: true,
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'number',
		},
		{
			header: 'Unit Price',
			accessorKey: 'unit_price',
			type: 'number',
			disabled: true,
		},
		{
			header: 'Received',
			accessorKey: 'is_received',
			type: 'checkbox',
		},

		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			hidden: !(isUpdate && !isNew),
			component: (index: number) => {
				return <FieldActionButton handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
