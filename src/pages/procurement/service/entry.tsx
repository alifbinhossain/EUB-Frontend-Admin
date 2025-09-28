import { Suspense, useEffect, useState } from 'react';
import { addMonths, differenceInMonths, format, isBefore } from 'date-fns';
import { useFieldArray, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import { useOtherVendor } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IServiceTableData } from './config/columns/columns.type';
import { useService, useServiceDetails } from './config/query';
import { IService, SERVICE_NULL, SERVICE_SCHEMA } from './config/schema';
import useServicePayment from './useGenerateServicePayment';
import { frequency, payment_terms, status } from './utils';

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();
	const { invalidateQuery: invalidateService } = useService<IServiceTableData[]>();
	const { user } = useAuth();
	const {
		data,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateServiceDetails,
	} = useServiceDetails(uuid as string);

	const { invalidateQuery } = useService<IServiceTableData[]>();
	const { data: vendorList } = useOtherVendor<IFormSelectOption[]>();

	const form = useRHF(SERVICE_SCHEMA, SERVICE_NULL);

	const {
		fields: generalNotesFields,
		append: appendGeneralNotes,
		remove: removeGeneralNotes,
	} = useFieldArray({
		control: form.control,
		name: 'service_payment',
	});

	// Reset form values when data is updated

	const startDate = new Date(useWatch({ control: form.control, name: 'start_date' }));
	const endDate = new Date(useWatch({ control: form.control, name: 'end_date' }));
	const currentFrequency = useWatch({ control: form.control, name: 'frequency' });
	useEffect(() => {
		const duration = differenceInMonths(endDate || new Date(), startDate || new Date());
		const length = generalNotesFields.length;
		let arraySize = 0;

		if (
			(startDate?.getDate() !== endDate?.getDate() &&
				Math.ceil(((duration ?? 0) + 1) % (12 / Number(currentFrequency))) === 0) ||
			duration === 0
		) {
			arraySize = Math.ceil(((duration ?? 0) + 1) / (12 / Number(currentFrequency)));
			console.log('arraySize', arraySize);
		} else {
			arraySize = Math.ceil((duration ?? 0) / (12 / Number(currentFrequency)));
		}
		if (arraySize) {
			for (let i = 0; i < arraySize - length; i++) {
				appendGeneralNotes({
					service_uuid: undefined,
					amount: 0,
					payment_date: null,
				});
			}
		}
		if (arraySize < length) {
			for (let i = 0; i < length - arraySize; i++) {
				removeGeneralNotes(i);
			}
		}
	}, [startDate, endDate, currentFrequency]);
	useEffect(() => {
		if (data && isUpdate) {
			// Reset form values
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IService) {
		if (isUpdate) {
			// * UPDATE ITEM
			const { service_payment, ...rest } = values;
			const itemUpdatedData = {
				...rest,
				updated_at: getDateTime(),
			};
			updateData
				.mutateAsync({
					url: `/procure/service/${uuid}`,
					updatedData: itemUpdatedData,
				})
				.then(() => {
					// * UPDATE FOR SERVICE PAYMENT
					if (service_payment.length > 0) {
						const servicePaymentUpdatePromise = service_payment.map((entry, index) => {
							if (!form.watch('start_date') || !form.watch('end_date')) {
								return null;
							}
							const paymentDateRaw = form.watch('start_date');
							const paymentDate = paymentDateRaw ? new Date(paymentDateRaw) : null;
							if (!paymentDate || isNaN(paymentDate.getTime())) {
								return null;
							}
							const frequency = form.watch('frequency');
							if (!frequency) {
								return null;
							}
							const addDueDate = addMonths(paymentDate, (12 / Number(frequency)) * (index + 1));
							const endDateRaw = form.watch('end_date');
							const endDate = endDateRaw ? new Date(endDateRaw) : null;
							let nextDueDate = addDueDate;
							if (endDate && isBefore(endDate, addDueDate)) {
								nextDueDate = endDate;
							}
							const formatNextDueDate = format(nextDueDate, 'yyyy-MM-dd HH:mm:ss');
							if (entry.uuid) {
								const entryUpdateData = {
									...entry,
									updated_at: getDateTime(),
									next_due_date: formatNextDueDate,
								};
								return updateData.mutateAsync({
									url: `/procure/service-payment/${entry.uuid}`,
									updatedData: entryUpdateData,
								});
							} else {
								const entryData = {
									...entry,
									created_at: getDateTime(),
									created_by: user?.uuid,
									uuid: nanoid(),
									service_uuid: uuid,
									next_due_date: formatNextDueDate,
								};
								return postData.mutateAsync({
									url: `/procure/service-payment`,
									newData: entryData,
								});
							}
						});
						Promise.all([...servicePaymentUpdatePromise]);
					}
				})
				.then(() => {
					invalidateQuery();
					invalidateService();
					invalidateService();
					invalidateServiceDetails();
					navigate('/procurement/service');
				})
				.catch((error) => {
					console.error('Error updating news:', error);
				});
		} else {
			// ADD NEW ITEM
			const { service_payment, ...rest } = values;

			const itemData = {
				...rest,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			};
			postData
				.mutateAsync({
					url: '/procure/service',
					newData: itemData,
				})
				.then(() => {
					// * ENTRY FOR SERVICE PAYMENT
					if (service_payment.length > 0) {
						const servicePaymentPromise = service_payment.map((entry, index) => {
							if (!form.watch('start_date') || !form.watch('end_date')) {
								return null;
							}
							const paymentDateRaw = form.watch('start_date');
							const paymentDate = paymentDateRaw ? new Date(paymentDateRaw) : null;
							if (!paymentDate || isNaN(paymentDate.getTime())) {
								return null;
							}
							const frequency = form.watch('frequency');
							if (!frequency) {
								return null;
							}
							const addDueDate = addMonths(paymentDate, (12 / Number(frequency)) * (index + 1));
							const endDateRaw = form.watch('end_date');
							const endDate = endDateRaw ? new Date(endDateRaw) : null;
							let nextDueDate = addDueDate;
							if (endDate && isBefore(endDate, addDueDate)) {
								nextDueDate = endDate;
							}
							const formatNextDueDate = format(nextDueDate, 'yyyy-MM-dd HH:mm:ss');
							const entryData = {
								...entry,
								service_uuid: itemData.uuid,
								created_at: getDateTime(),
								created_by: user?.uuid,
								next_due_date: formatNextDueDate,
								uuid: nanoid(),
							};
							return postData.mutateAsync({
								url: `/procure/service-payment`,
								newData: entryData,
							});
						});
						Promise.all([...servicePaymentPromise]);
					}
				})
				.then(() => {
					invalidateQuery();
					invalidateServiceDetails();
					invalidateService();
					invalidateService();
					navigate('/procurement/service');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}
	// ? Dynamic Form
	// * ADD GENERAL NOTES
	const handleAddGeneralNotes = () => {
		appendGeneralNotes({
			service_uuid: undefined,
			amount: 0,
			payment_date: null,
		});
	};
	// * DELETE
	const [deleteItem, setDeleteItem] = useState<{
		type?: string;
		id: string;
		name: string;
	} | null>(null);
	// * REMOVE GENERAL NOTES
	const handleRemoveGeneralNotes = (index: number) => {
		const servicePayment = generalNotesFields[index];
		if (servicePayment.uuid) {
			// setDeleteItem({
			// 	type: 'general_notes',
			// 	id: generalNotesFields[index].uuid,
			// 	name: generalNotesFields[index].id,
			// });
			return updateData.mutateAsync({
				url: `/procure/service-payment/${servicePayment.uuid}`,
				updatedData: { amount: 0, payment_date: null, updated_at: getDateTime() },
			});
		} else {
			removeGeneralNotes(index);
		}
	};

	// * COPY GENERAL NOTES
	const handleCopyGeneralNotes = (index: number) => {
		const field = form.watch('service_payment')[index];
		appendGeneralNotes({
			amount: field.amount,
			service_uuid: field.service_uuid,
			payment_date: field.payment_date,
		});
	};

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Update Service' : 'Add Service'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section
				title={`Service`}
				className='grid gap-4 lg:grid-cols-3'
				extraHeader={
					<FormField
						control={form.control}
						name='approval_required'
						render={(props) => (
							<CoreForm.Switch label='Approval Req.' labelClassName='text-slate-100' {...props} />
						)}
					/>
				}
			>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField
					control={form.control}
					name='vendor_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Vendor'
							placeholder='Select vendor'
							menuPortalTarget={document.body}
							options={vendorList!}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='frequency'
					render={(props) => (
						<CoreForm.ReactSelect
							label={`Frequency/Year`}
							placeholder='Select frequency'
							menuPortalTarget={document.body}
							isDisabled={isUpdate}
							options={frequency!}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='status'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Status'
							placeholder='Select status'
							menuPortalTarget={document.body}
							options={status!}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='payment_terms'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Payment Terms'
							placeholder='Select payment-terms'
							menuPortalTarget={document.body}
							options={payment_terms!}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='start_date'
					render={(props) => <CoreForm.DatePicker disabled={isUpdate} {...props} />}
				/>
				<FormField
					control={form.control}
					name='end_date'
					render={(props) => <CoreForm.DatePicker disabled={isUpdate} {...props} />}
				/>
				<FormField
					control={form.control}
					name='cost_per_service'
					render={(props) => <CoreForm.Input type='number' label='Cost/Service' {...props} />}
				/>
				<FormField
					control={form.control}
					name='description'
					render={(props) => <CoreForm.Textarea className='col-span-2' {...props} />}
				/>
			</CoreForm.Section>
			<CoreForm.DynamicFields
				title='Service Payment'
				form={form}
				fieldName='service_payment'
				fieldDefs={useServicePayment({
					data: form.getValues(),
					copy: handleCopyGeneralNotes,
					remove: handleRemoveGeneralNotes,
					form: form,
					isUpdate,
					isNew: false,
				})}
				fields={generalNotesFields}
			/>
			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/procure/service-payment`,
						deleteData,
						invalidateQuery: invalidateServiceDetails,
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
