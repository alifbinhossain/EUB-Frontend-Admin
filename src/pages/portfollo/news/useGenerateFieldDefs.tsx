import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import { INews } from '../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<INews>; // TODO: Update Schema Type
	isUpdate: boolean;
}

const useGenerateFieldDefs = ({ copy, remove, isUpdate }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Image',
			accessorKey: 'documents',
			type: 'image',
			isUpdate: isUpdate,
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
