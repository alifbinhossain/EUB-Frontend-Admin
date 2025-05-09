import { useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useRHF from '@/hooks/useRHF';

import Pdf from '@/components/pdf/comparative-statement';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { COMPARATIVE_NULL, COMPARATIVE_SCHEMA, IComparative } from '../config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;

	const form = useRHF(COMPARATIVE_SCHEMA, COMPARATIVE_NULL);
	const { fields, remove, append } = useFieldArray({
		control: form.control,
		name: 'vendors',
	});

	// Submit handler
	async function onSubmit(values: IComparative) {
		const printWindow = window.open('', '_blank');
		Pdf(values)?.print({}, printWindow);
	}

	const handleAdd = () => {
		append({
			name: '',
			quantity: 0,
			price: 0,
		});
	};
	const handleRemove = (index: number) => {
		remove(index);
	};
	const handleCopy = (index: number) => {
		const field = form.watch('vendors')[index];
		append({
			name: field.name,
			quantity: field.quantity,
			price: field.price,
		});
	};

	return (
		<CoreForm.AddEditWrapper title='Work Order Form' form={form} onSubmit={onSubmit}>
			<CoreForm.Section title={`Comparative Statement`}>
				<FormField
					control={form.control}
					name='uuid'
					render={(props) => <CoreForm.Input label='Requisition UUID' {...props} />}
				/>
				<FormField
					control={form.control}
					name='description'
					render={(props) => <CoreForm.Textarea label='Item/Work Description' {...props} />}
				/>{' '}
			</CoreForm.Section>
			<CoreForm.DynamicFields
				title='Vendors'
				form={form}
				fieldName='vendors'
				fieldDefs={useGenerateFieldDefs({
					watch: form.watch,
					set: form.setValue,
					remove: handleRemove,
					copy: handleCopy,
					isUpdate,
					isNew: false,
					data: form.getValues(),
					form: form,
				})}
				fields={fields}
				handleAdd={handleAdd}
			/>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
