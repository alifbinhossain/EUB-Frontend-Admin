import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { IAdmissionForm } from '../../_config/schema';

const Address = () => {
	const form = useFormContext<IAdmissionForm>();

	return (
		<CoreForm.Section title={`Address`}>
			<FormField
				control={form.control}
				name='present_address'
				render={(props) => <CoreForm.Textarea label='Present Address' {...props} />}
			/>
			<FormField control={form.control} name='village' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='post_office'
				render={(props) => <CoreForm.Input label='Post Office' {...props} />}
			/>
			<FormField control={form.control} name='thana' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='district' render={(props) => <CoreForm.Input {...props} />} />
		</CoreForm.Section>
	);
};

export default Address;
