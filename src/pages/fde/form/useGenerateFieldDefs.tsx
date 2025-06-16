import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import DateTime from '@/components/ui/date-time';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { getDateTime } from '@/utils';

import { IForm } from '../../fde/config/schema';

interface IGenerateFieldDefsProps {
	watch: UseFormWatch<IForm>;
	set: UseFormSetValue<IForm>;
	isUpdate: boolean;
	isNew: boolean;
	data: IForm;
	form: any;
}

const useGenerateFieldDefs = ({ isUpdate, isNew, watch, set, data, form }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Index',
			accessorKey: 'index',
			type: 'custom',
			component: (index) => {
				return <span className='w-11'>{index + 1}</span>;
			},
		},
		{
			header: 'Question',
			accessorKey: 'name',
			type: 'readOnly',
			width: '24',
		},
		{
			header: 'Rating',
			accessorKey: 'rating',
			type: 'radio',
			options: [
				{ value: 1, label: '1' },
				{ value: 2, label: '2' },
				{ value: 3, label: '3' },
				{ value: 4, label: '4' },
				{ value: 5, label: '5' },
			],
		},
	];
};

export default useGenerateFieldDefs;
