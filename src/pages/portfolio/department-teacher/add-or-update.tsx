import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherDepartments, useOtherUser } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useDepartmentsTeachers, useDepartmentsTeachersByUUID } from '../_config/query';
import {
	IDepartmentTeachers,
	PORTFOLIO_DEPARTMENT_TEACHER_NULL,
	PORTFOLIO_DEPARTMENT_TEACHER_SCHEMA,
} from '../_config/schema';
import { IDepartmentTeachersAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IDepartmentTeachersAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useDepartmentsTeachersByUUID(updatedData?.uuid as string);
	const { data: departments } = useOtherDepartments<IFormSelectOption[]>();
	const { data: users } = useOtherUser<IFormSelectOption[]>();
	const { invalidateQuery: invalidateTeachers } = useDepartmentsTeachers();

	const form = useRHF(PORTFOLIO_DEPARTMENT_TEACHER_SCHEMA, PORTFOLIO_DEPARTMENT_TEACHER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(PORTFOLIO_DEPARTMENT_TEACHER_NULL);
		setOpen((prev) => !prev);
		invalidateTeachers();
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IDepartmentTeachers) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			postData.mutateAsync({
				url,
				newData: {
					...values,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Department Teacher' : 'Add Department Teacher'}
			form={form}
			onSubmit={onSubmit}
			isSmall={true}
		>
			<FormField
				control={form.control}
				name='department_head'
				render={(props) => <CoreForm.Checkbox {...props} />}
			/>

			<div className='grid grid-cols-3 gap-4'>
				<FormField
					control={form.control}
					name='teacher_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Teacher'
							placeholder='Select Teacher'
							options={users!}
							{...props}
						/>
					)}
				/>

				<FormField
					control={form.control}
					name='department_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Department'
							placeholder='Select Department'
							options={departments!}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='teacher_designation'
					render={(props) => <CoreForm.Input label='Designation' {...props} />}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='teacher_email'
					render={(props) => <CoreForm.Input label='Email' {...props} />}
				/>
				<FormField
					control={form.control}
					name='teacher_phone'
					render={(props) => <CoreForm.Input label='Phone' {...props} />}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='appointment_date'
					render={(props) => <CoreForm.DatePicker {...props} />}
				/>
				<FormField
					control={form.control}
					name='resign_date'
					render={(props) => <CoreForm.DatePicker {...props} />}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='education'
					render={(props) => <CoreForm.Textarea {...props} />}
				/>
				<FormField control={form.control} name='about' render={(props) => <CoreForm.Textarea {...props} />} />
			</div>

			<FormField
				control={form.control}
				name='publication'
				render={(props) => <CoreForm.RichTextEditor {...props} />}
			/>
			<FormField control={form.control} name='journal' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
