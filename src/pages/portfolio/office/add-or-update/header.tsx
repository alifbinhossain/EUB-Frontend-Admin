import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { IOffice } from '../../_config/schema';
import { categories } from '../utills';

const Header = ({ isUpdate }: { isUpdate: boolean }) => {
	const form = useFormContext<IOffice>();
	const categoryOptions = categories;

	return (
		<CoreForm.Section title={`Information`}>
			<FormField control={form.control} name='title' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='category'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Category'
						placeholder='Select Category'
						options={categoryOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='image'
				render={(props) => <CoreForm.FileUpload isUpdate={isUpdate} {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</CoreForm.Section>
	);
};

export default Header;
