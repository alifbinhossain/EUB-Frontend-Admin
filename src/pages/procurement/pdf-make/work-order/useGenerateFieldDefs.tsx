import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { IWorkOrder } from '../config/schema';

interface IGenerateFieldDefsProps {
	remove: (index: number) => void;
	copy: (index: number) => void;
	watch: UseFormWatch<IWorkOrder>;
	set: UseFormSetValue<IWorkOrder>;
	isNew: boolean;
	data: IWorkOrder;
	form: any;
}

const useGenerateFieldDefs = ({ remove, copy, watch }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'No',
			accessorKey: 'no',
			type: 'custom',
			component: (index: number) => {
				return <span>{index + 1}</span>;
			},
		},
		{
			header: 'Product',
			accessorKey: 'product_name',
			type: 'text',
		},
		{
			header: 'Description',
			accessorKey: 'description',
			type: 'text',
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
		},
		{
			header: 'Total Price',
			accessorKey: 'total_price',
			type: 'number',
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
