import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { IAdmissionForm } from '../../_config/schema';
import { educationBoards, grades, higherEducationTypes } from '../utills';

const HigherEducationBackground = () => {
	const form = useFormContext<IAdmissionForm>();
	const gradeOptions = grades;
	const groupOptions = higherEducationTypes;
	const boardOptions = educationBoards;

	return (
		<CoreForm.Section title={`Higher Secondary Education Background`}>
			<FormField
				control={form.control}
				name='hsc_group'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Group'
						placeholder='Select Group'
						menuPortalTarget={document.body}
						options={groupOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='hsc_grade'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Grade'
						placeholder='Select Grade'
						menuPortalTarget={document.body}
						options={gradeOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='hsc_gpa'
				render={(props) => <CoreForm.Input label='GPA' type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='hsc_board'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Board'
						placeholder='Select Board'
						menuPortalTarget={document.body}
						options={boardOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='hsc_passing_year'
				render={(props) => <CoreForm.Input label='Passing Year' type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='hsc_institute'
				render={(props) => <CoreForm.Input label='Institute' {...props} />}
			/>
		</CoreForm.Section>
	);
};

export default HigherEducationBackground;
