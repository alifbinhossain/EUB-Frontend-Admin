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
					<CoreForm.ReactSelect label='Group' placeholder='Select Group' options={groupOptions!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='hsc_grade'
				render={(props) => (
					<CoreForm.ReactSelect label='Grade' placeholder='Select Grade' options={gradeOptions!} {...props} />
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
					<CoreForm.ReactSelect label='Board' placeholder='Select Board' options={boardOptions!} {...props} />
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
			<FormField
				control={form.control}
				name='hsc_roll_number'
				render={(props) => <CoreForm.Input label='Roll Number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='hsc_registration_number'
				render={(props) => <CoreForm.Input label='Registration Number' {...props} />}
			/>
		</CoreForm.Section>
	);
};

export default HigherEducationBackground;
