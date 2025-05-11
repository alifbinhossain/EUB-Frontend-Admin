import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { ICapital } from './config/schema';

interface IGenerateFieldDefsProps {
	data: ICapital;
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<ICapital>; // TODO: Update Schema Type
	isUpdate: boolean;
	isNew: boolean;
}

const useGenerateGeneralNotes = ({ data, copy, remove, isUpdate, isNew }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Description',
			accessorKey: 'description',
			type: 'textarea',
		},
		{
			header: 'Amount',
			accessorKey: 'amount',
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

export default useGenerateGeneralNotes;
