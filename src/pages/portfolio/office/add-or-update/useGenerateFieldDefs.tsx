import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import { useOtherUser } from '@/lib/common-queries/other';

import { IOffice } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IOffice>;
}

const useGenerateFieldDefs = ({ copy, remove }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: userOption } = useOtherUser<IFormSelectOption[]>();

	return [
		{
			header: 'User',
			accessorKey: 'user_uuid',
			type: 'select',
			placeholder: 'Select User',
			options: userOption || [],
		},
		{
			header: 'Designation',
			accessorKey: 'designation',
			type: 'text',
			placeholder: 'Designation',
		},
		{
			header: 'Phone',
			accessorKey: 'user_phone',
			type: 'text',
			placeholder: 'Phone',
		},
		{
			header: 'Email',
			accessorKey: 'user_email',
			type: 'text',
			placeholder: 'Email',
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
