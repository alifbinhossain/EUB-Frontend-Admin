import { useFormContext } from 'react-hook-form';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherPrograms } from '@/lib/common-queries/other';

import { IAdmissionForm } from '../../_config/schema';

const Header = () => {
	const form = useFormContext<IAdmissionForm>();
	const { data: programOption } = useOtherPrograms<IFormSelectOption[]>();

	// const semesters: IFormSelectOption[] = [
	// 	{
	// 		label: 'Spring',
	// 		value: 'spring',
	// 	},
	// 	{
	// 		label: 'Summer',
	// 		value: 'summer',
	// 	},
	// 	{
	// 		label: 'Fall',
	// 		value: 'fall',
	// 	},
	// ];

	return (
		<CoreForm.Section title={`Admission Form`}>
			<FormField control={form.control} name='applicant_name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='program_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Program'
						placeholder='Select Program'
						menuPortalTarget={document.body}
						options={programOption!}
						{...props}
					/>
				)}
			/>
			{/* <FormField
				control={form.control}
				name='semester'
				render={(props) => <CoreForm.Radio label='Proposed Semester' options={semesters} {...props} />}
			/> */}

			<div className='flex space-x-1'>
				<label className='font-semibold'>Proposed Semester*</label>
				<FormField
					control={form.control}
					name='spring'
					render={(props) => (
						<CoreForm.Checkbox
							onCheckedChange={() => {
								if (form.getValues('spring') === false) {
									form.setValue('spring', true);
									form.setValue('summer', false);
									form.setValue('fall', false);
								} else {
									form.setValue('spring', false);
								}
							}}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='summer'
					render={(props) => (
						<CoreForm.Checkbox
							onCheckedChange={() => {
								if (form.getValues('summer') === false) {
									form.setValue('spring', false);
									form.setValue('summer', true);
									form.setValue('fall', false);
								} else {
									form.setValue('summer', false);
								}
							}}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='fall'
					render={(props) => (
						<CoreForm.Checkbox
							onCheckedChange={() => {
								if (form.getValues('fall') === false) {
									form.setValue('spring', false);
									form.setValue('summer', false);
									form.setValue('fall', true);
								} else {
									form.setValue('fall', false);
								}
							}}
							{...props}
						/>
					)}
				/>
			</div>
		</CoreForm.Section>
	);
};

export default Header;
