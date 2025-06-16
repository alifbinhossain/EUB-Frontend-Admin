import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherTeachers } from '@/lib/common-queries/other';

import { ICourseAssign } from '../config/schema';

interface IGenerateFieldDefsProps {
	remove: (index: number) => void;

	watch: UseFormWatch<ICourseAssign>;
	set: UseFormSetValue<ICourseAssign>;
	isUpdate: boolean;
	isNew: boolean;
	data: ICourseAssign;
	form: any;
}

const useGenerateFieldDefs = ({
	remove,
	isUpdate,
	isNew,
	watch,
	set,
	data,
	form,
}: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: teachersList } = useOtherTeachers<IFormSelectOption[]>();
	return [
		{
			header: 'Section',
			accessorKey: 'course_section_name',
			type: 'text',
			disabled: true,
		},
		{
			header: 'Teacher',
			accessorKey: 'teachers_uuid',
			type: 'select',
			options: teachersList || [],
			unique: true,
			excludeOptions:
				data.sem_crs_thr_entry
					.map((item) => item.teachers_uuid)
					.filter((uuid): uuid is string => uuid !== undefined) || [],
		},
		{
			header: 'Class Size',
			accessorKey: 'class_size',
			type: 'number',
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
