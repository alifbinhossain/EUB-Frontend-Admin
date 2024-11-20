import { Image } from 'lucide-react';
import Dropzone from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { INews_Portal } from '../../_config/schema';

const Header = () => {
	const form = useFormContext<INews_Portal>();

	return (
		<CoreForm.Section title='Information'>
			<FormField control={form.control} name='title' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='subtitle' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='description' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='cover_image' render={(props) => <CoreForm.File {...props} />} />
			{/* <Dropzone multiple={false} onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
				{({ getRootProps, getInputProps }) => (
					<div
						className='bg-gradient flex aspect-video flex-col items-center justify-center gap-2 rounded border-2 border-dashed'
						{...getRootProps()}
					>
						<input {...getInputProps()} />
						<Image />
						<p className='font-medium'>Drop your image here or browse</p>
					</div>
				)}
			</Dropzone> */}
		</CoreForm.Section>
	);
};

export default Header;
