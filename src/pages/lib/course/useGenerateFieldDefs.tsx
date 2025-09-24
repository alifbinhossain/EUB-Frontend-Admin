import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { ICourse } from '../config/schema';

interface IGenerateFieldDefsProps {
	remove: (index: number) => void;
	copy: (index: number) => void;
	watch: UseFormWatch<ICourse>;
	set: UseFormSetValue<ICourse>;
	isUpdate: boolean;
	isNew: boolean;
	data: ICourse;
	form: any;
}

const useGenerateFieldDefs = ({
	remove,
	copy,
	isUpdate,
	isNew,
	watch,
	set,
	data,
	form,
}: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Index',
			accessorKey: 'index',
			type: 'custom',
			component: (index: number) => {
				return <span className='w-11'>{index + 1}</span>;
			},
		},
		{
			header: 'Section Name',
			accessorKey: 'name',
			placeholder: 'e.g. Sec - A',
			type: 'text',
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return <FieldActionButton handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
