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
	type: 'regular' | 'evening';
	teacherLists: IFormSelectOption[];
	form: any;
}

const useGenerateFieldDefs = ({
	remove,
	type = 'regular',
	teacherLists,
	form,
}: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Section',
			accessorKey: 'course_section_name',
			type: 'custom',
			component: (index: number) => {
				if (form.watch(`${type}.${index}.teacher_uuid`) == null) {
					return (
						<span className='rounded-sm bg-red-100 p-1 text-red-600'>
							{form.watch(`${type}.${index}.course_section_name`)}
						</span>
					);
				} else {
					return (
						<span className='rounded-sm bg-green-100 p-1 text-green-600'>
							{form.watch(`${type}.${index}.course_section_name`)}
						</span>
					);
				}
			},
		},
		{
			header: 'Teacher',
			accessorKey: 'teachers_uuid',
			type: 'select',
			options: teacherLists || [],
			// unique: true,
			// excludeOptions:
			// 	data.sem_crs_thr_entry
			// 		.map((item) => item.teachers_uuid)
			// 		.filter((uuid): uuid is string => uuid !== undefined) || [],
		},
		{
			header: 'Total Students',
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
