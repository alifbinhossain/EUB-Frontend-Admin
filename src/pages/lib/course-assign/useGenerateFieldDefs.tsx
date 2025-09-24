import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@/components/core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@/components/core/form/types';

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
			type: 'custom',
			component: (index: number) => {
				if (form.watch(`sem_crs_thr_entry.${index}.teacher_uuid`) == null) {
					return (
						<span className='rounded-sm bg-red-400 p-1'>
							{form.watch(`sem_crs_thr_entry.${index}.course_section_name`)}
						</span>
					);
				} else {
					return (
						<span className='rounded-sm bg-green-400 p-1'>
							{form.watch(`sem_crs_thr_entry.${index}.course_section_name`)}
						</span>
					);
				}
			},
		},
		{
			header: 'Teacher',
			accessorKey: 'teachers_uuid',
			type: 'select',
			options: teachersList || [],
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
