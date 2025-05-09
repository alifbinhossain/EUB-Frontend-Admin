import { useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useRHF from '@/hooks/useRHF';

import { ShowLocalToast } from '@/components/others/toast';
import Pdf from '@/components/pdf/item-requstion-captial';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { ITEM_REQUISITION_NULL, ITEM_REQUISITION_SCHEMA, ItemRequisition } from '../config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;

	const form = useRHF(ITEM_REQUISITION_SCHEMA, ITEM_REQUISITION_NULL);
	const { fields, remove, append } = useFieldArray({
		control: form.control,
		name: 'item_requisition',
	});

	// Submit handler
	async function onSubmit(values: ItemRequisition) {
		Pdf(values)?.print({}, window);
	}

	const handleAdd = () => {
		if (fields.length > 9) {
			ShowLocalToast({
				toastType: 'error',
				message: 'You can add maximum 10 products',
			});
			return;
		}
		append({
			item: '',
			quantity: 0,
		});
	};
	const handleRemove = (index: number) => {
		remove(index);
	};
	const handleCopy = (index: number) => {
		const field = form.watch('item_requisition')[index];
		append({
			item: field.item,
			quantity: field.quantity,
		});
	};

	return (
		<CoreForm.AddEditWrapper title='Work Order Form' form={form} onSubmit={onSubmit}>
			<CoreForm.Section title={`Article Requisition Form (Capital)`}>
				<FormField control={form.control} name='uuid' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField
					control={form.control}
					name='designation'
					render={(props) => <CoreForm.Input {...props} />}
				/>{' '}
				<FormField control={form.control} name='department' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			</CoreForm.Section>
			<CoreForm.DynamicFields
				title='Product List: Max 10'
				form={form}
				fieldName='item_requisition'
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
