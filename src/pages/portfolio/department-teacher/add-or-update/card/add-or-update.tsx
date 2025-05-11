import { useEffect } from 'react';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherUser } from '@/lib/common-queries/other';

import { useDepartmentsTeachers } from '../../../_config/query';
import { PORTFOLIO_DEPARTMENT_TEACHER_NULL, PORTFOLIO_DEPARTMENT_TEACHER_SCHEMA } from '../../../_config/schema';
import { IDepartmentTeachersAddOrUpdateProps } from '../../../_config/types';

const AddOrUpdate: React.FC<IDepartmentTeachersAddOrUpdateProps> = ({
	isUpdate = true,
	open,
	setOpen,
	onSubmit,
	updatedData,
	setUpdatedData,
}) => {
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
		if (updatedData && isUpdate) {
			form.reset(updatedData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updatedData, isUpdate]);

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Teacher' : 'Add Teacher'}
			form={form}
			onSubmit={onSubmit}
			isSmall={true}
		>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='department_head'
					render={(props) => <CoreForm.Switch {...props} />}
				/>
				<FormField control={form.control} name='status' render={(props) => <CoreForm.Switch {...props} />} />
			</div>
			{form.watch('department_head') && (
				<FormField
					control={form.control}
					name='department_head_message'
					render={(props) => <CoreForm.RichTextEditor label='Message' {...props} />}
				/>
			)}

			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='teacher_designation'
					render={(props) => <CoreForm.Input label='Designation' {...props} />}
				/>
				<FormField
					control={form.control}
					name='teacher_initial'
					render={(props) => <CoreForm.Input label='Initial' {...props} />}
				/>
			</div>

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
			<FormField
				control={form.control}
				name='education'
				render={(props) => <CoreForm.RichTextEditor {...props} />}
			/>
			<FormField control={form.control} name='about' render={(props) => <CoreForm.RichTextEditor {...props} />} />

			<FormField
				control={form.control}
				name='publication'
				render={(props) => <CoreForm.RichTextEditor {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
