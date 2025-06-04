import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { IAdmissionForm } from '../../_config/schema';
import { bloodGroups, genders, maritalStatuses } from '../utills';

const PersonalInformation = () => {
	const form = useFormContext<IAdmissionForm>();
	const genderOptions = genders;
	const maritalStatusOptions = maritalStatuses;
	const bloodGroupOptions = bloodGroups;

	return (
		<CoreForm.Section title={`Personal Information`}>
			<FormField control={form.control} name='father_name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='mother_name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='local_guardian' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='gender'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Gender'
						placeholder='Select Gender'
						menuPortalTarget={document.body}
						options={genderOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='marital_status'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Marital Status'
						placeholder='Select Marital Status'
						menuPortalTarget={document.body}
						options={maritalStatusOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='date_of_birth'
				render={(props) => <CoreForm.DatePicker label='Date of Birth' {...props} />}
			/>
			<FormField
				control={form.control}
				name='phone_number'
				render={(props) => <CoreForm.Phone label='Phone Number' {...props} />}
			/>
			<br />

			<FormField control={form.control} name='email' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='bkash' render={(props) => <CoreForm.Phone {...props} />} />
			<br />
			<FormField
				control={form.control}
				name='blood_group'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Blood Group'
						placeholder='Select Blood Group'
						menuPortalTarget={document.body}
						options={bloodGroupOptions!}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='nationality' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='birth_certificate_number'
				render={(props) => <CoreForm.Input label='Birth Certificate' {...props} />}
			/>
			<FormField
				control={form.control}
				name='nid_number'
				render={(props) => <CoreForm.Input label='NID Number' {...props} />}
			/>
		</CoreForm.Section>
	);
};

export default PersonalInformation;
