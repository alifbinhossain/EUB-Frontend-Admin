import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { IBill } from '../config/schema';
import { types } from '../utills';

interface IGenerateFieldDefsProps {
	copy: (index: any) => void;
	remove: (index: any) => void;
	watch?: UseFormWatch<IBill>;
	form: any;
	data: any;
}

const useGenerateFieldDefs = ({ copy, remove, watch, data }: IGenerateFieldDefsProps): FieldDef[] => {
	const isComplete = data?.is_completed || false;
	return [
		{
			header: 'Type',
			accessorKey: 'type',
			type: 'select',
			placeholder: 'Select type',
			options: types || [],
			disabled: isComplete,
		},
		{
			header: 'Amount',
			accessorKey: 'amount',
			type: 'number',
			disabled: isComplete,
		},
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'textarea',
			disabled: isComplete,
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} hidden={isComplete} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
