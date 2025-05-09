import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { IComparative } from '../config/schema';

interface IGenerateFieldDefsProps {
	remove: (index: number) => void;
	copy: (index: number) => void;
	watch: UseFormWatch<IComparative>;
	set: UseFormSetValue<IComparative>;
	isUpdate: boolean;
	isNew: boolean;
	data: IComparative;
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
			header: 'Vendors Name',
			accessorKey: 'name',
			type: 'text',
		},
		{
			header: 'Price',
			accessorKey: 'price',
			type: 'number',
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
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
