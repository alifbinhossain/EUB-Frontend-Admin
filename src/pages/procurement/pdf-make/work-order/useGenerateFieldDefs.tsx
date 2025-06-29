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

const useGenerateFieldDefs = ({ remove, copy, watch, set }: IGenerateFieldDefsProps): FieldDef[] => {
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
			type: 'custom',
			component: (index: number) => {
				const quantity = watch(`product.${index}.quantity`) || 0;
				const unitPrice = watch(`product.${index}.unit_price`) || 0;
				set(`product.${index}.total_price`, quantity * unitPrice);
				return <span>{quantity * unitPrice}</span>;
			},
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
