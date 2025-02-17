import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { IAdmissionForm } from '../../_config/schema';

const BachelorDegree = () => {
	const form = useFormContext<IAdmissionForm>();

	return (
		<CoreForm.Section title={`Bachelor Degree (Graduation)`}>
			<FormField
				control={form.control}
				name='bsc_name'
				render={(props) => <CoreForm.Input label='Name' {...props} />}
			/>
			<FormField
				control={form.control}
				name='bsc_cgpa'
				render={(props) => <CoreForm.Input label='CGPA' type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='bsc_passing_year'
				render={(props) => <CoreForm.Input label='Passing Year' type='number' {...props} />}
			/>
			<FormField
				control={form.control}
				name='bsc_institute'
				render={(props) => <CoreForm.Input label='Institution Name' {...props} />}
			/>
		</CoreForm.Section>
	);
};

export default BachelorDegree;
