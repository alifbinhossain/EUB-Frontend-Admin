import { useFieldArray } from 'react-hook-form';
import useRHF from '@/hooks/useRHF';

import { ShowLocalToast } from '@/components/others/toast';
import Pdf from '@/components/pdf/work-order';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { IWorkOrder, WORK_ORDER_NULL, WORK_ORDER_SCHEMA } from '../config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';
import usePaymentFieldDefs from './usePaymentFieldDefs copy';

const Entry = () => {
	const form = useRHF(WORK_ORDER_SCHEMA, WORK_ORDER_NULL);
	const { fields, remove, append } = useFieldArray({
		control: form.control,
		name: 'product',
	});
	const {
		fields: paymentFields,
		remove: paymentRemove,
		append: paymentAppend,
	} = useFieldArray({
		control: form.control,
		name: 'payment',
	});

	// Submit handler
	async function onSubmit(values: IWorkOrder) {
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
			product_name: '',
			description: '',
			quantity: 0,
			unit_price: 0,
			total_price: 0,
		});
	};
	const handleRemove = (index: number) => {
		remove(index);
	};

	const handlePaymentRemove = (index: number) => {
		paymentRemove(index);
	};
	const handlePaymentAdd = () => {
		if (paymentFields.length > 1) {
			ShowLocalToast({
				toastType: 'error',
				message: 'You can add maximum 2 payment conditions',
			});
			return;
		}
		paymentAppend({
			condition: '',
		});
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		const field = form.watch('product')[index];
		append({
			product_name: field.product_name,
			description: field.description,
			quantity: field.quantity,
			unit_price: field.unit_price,
			total_price: field.total_price,
		});
	};

	return (
		<CoreForm.AddEditWrapper title='Work Order Form' form={form} onSubmit={onSubmit}>
			<CoreForm.Section title={`To`}>
				<FormField
					control={form.control}
					name='employee_designation'
					render={(props) => <CoreForm.Input {...props} />}
				/>
				<FormField
					control={form.control}
					name='vendor_company_name'
					render={(props) => <CoreForm.Input label='Vendor Company Name' {...props} />}
				/>
				<FormField
					control={form.control}
					name='vendor_address'
					render={(props) => <CoreForm.Input {...props} />}
				/>{' '}
				<FormField
					control={form.control}
					name='employee_contact_number'
					render={(props) => <CoreForm.Phone label='Vendor Contact Number' {...props} />}
				/>
			</CoreForm.Section>
			<CoreForm.Section title={`Body`} className='flex flex-col gap-2'>
				<FormField
					control={form.control}
					name='subject'
					render={(props) => <CoreForm.Input className='flex-1' {...props} />}
				/>
				<FormField
					control={form.control}
					name='body_opening'
					render={(props) => <CoreForm.Textarea label='Body Opening' className='flex-1' {...props} />}
				/>
				<div className='flex-1'>
					<CoreForm.DynamicFields
						title={`Product List : Max 10`}
						form={form}
						fieldName='product'
						fieldDefs={useGenerateFieldDefs({
							watch: form.watch,
							set: form.setValue,
							remove: handleRemove,
							copy: handleCopy,
							isNew: false,
							data: form.getValues(),
							form: form,
						})}
						fields={fields}
						handleAdd={handleAdd}
					>
						<tr>
							<td colSpan={5} className='text-right font-bold'>
								Grand Total:
							</td>
							<td colSpan={2}>
								<FormField
									control={form.control}
									name='grand_total'
									render={(props) => <CoreForm.Input disableLabel={true} type='number' {...props} />}
								/>
							</td>
						</tr>
						<tr>
							<td colSpan={1} className='text-right font-bold'>
								In Words:
							</td>
							<td colSpan={6}>
								<FormField
									control={form.control}
									name='in_words'
									render={(props) => <CoreForm.Input disableLabel={true} {...props} />}
								/>
							</td>
						</tr>
					</CoreForm.DynamicFields>
				</div>
				<CoreForm.DynamicFields
					title='Payment Condition: Max 2'
					form={form}
					fieldName='payment'
					fieldDefs={usePaymentFieldDefs({
						watch: form.watch,
						set: form.setValue,
						remove: handlePaymentRemove,
						isNew: false,
						data: form.getValues(),
						form: form,
					})}
					fields={paymentFields}
					handleAdd={handlePaymentAdd}
				></CoreForm.DynamicFields>
				<FormField
					control={form.control}
					name='completion_date'
					render={(props) => <CoreForm.DatePicker {...props} />}
				/>
				<FormField
					control={form.control}
					name='body_ending'
					render={(props) => <CoreForm.Textarea label='Body Ending' {...props} />}
				/>
			</CoreForm.Section>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
