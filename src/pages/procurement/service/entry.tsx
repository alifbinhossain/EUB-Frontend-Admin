import { Suspense, useEffect, useMemo, useState } from 'react';
import { addMonths, differenceInMonths, format } from 'date-fns';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { ShowLocalToast } from '@/components/others/toast';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import { useOtherSubCategory, useOtherVendor } from '@/lib/common-queries/other';
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

	const { user } = useAuth();
	const {
		data,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateServiceDetails,
	} = useServiceDetails(uuid as string);

	const { invalidateQuery } = useService<IServiceTableData[]>();
	const { data: subCategoryList } = useOtherSubCategory<IFormSelectOption[]>();
	const { data: vendorList } = useOtherVendor<IFormSelectOption[]>();
	const [changeStatus, setChangeStatus] = useState(false);

	const form = useRHF(SERVICE_SCHEMA, SERVICE_NULL);

	const {
		fields: generalNotesFields,
		append: appendGeneralNotes,
		remove: removeGeneralNotes,
	} = useFieldArray({
		control: form.control,
		name: 'service_payment',
	});

	const { arraySize } = useMemo(() => {
		const startDate = form.watch('start_date') ? new Date(form.watch('start_date')) : null;
		const endDate = form.watch('end_date') ? new Date(form.watch('end_date')) : null;
		const duration = differenceInMonths(endDate || new Date(), startDate || new Date());

		const currentFrequency = form.watch('frequency');

		const arraySize = Math.ceil((duration ?? 0) / (12 / Number(currentFrequency)));

		return { arraySize };
	}, [form.watch('start_date'), form.watch('end_date'), form.watch('frequency')]);

	useEffect(() => {
		const length = generalNotesFields.length;
		const validData = generalNotesFields.filter((item) => item.payment_date !== undefined);
		if (validData.length > arraySize) {
			ShowLocalToast({
				toastType: 'error',
				message: 'Please remove extra service payment',
			});
			return;
		}
		if (arraySize > length) {
			for (let i = 0; i < arraySize - length; i++) {
				appendGeneralNotes({
					service_uuid: undefined,
					amount: 0,
					payment_date: undefined,
				});
			}
		}
	}, [arraySize, changeStatus, data, invalidateServiceDetails]);

	// Reset form values when data is updated
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
							let paymentDate = form.watch(`start_date`);
							paymentDate = paymentDate ? format(paymentDate, 'yyyy-MM-dd') : '';
							if (!paymentDate) {
								return null;
							}
							const frequency = form.watch(`frequency`);
							const nextDueDate = addMonths(new Date(paymentDate), Number(frequency) * (index + 1));
							if (entry.payment_date) {
								if (entry.uuid) {
									const entryUpdateData = {
										...entry,
										updated_at: getDateTime(),
										next_due_date: nextDueDate,
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
										next_due_date: nextDueDate,
									};
									return postData.mutateAsync({
										url: `/procure/service-payment`,
										newData: entryData,
									});
								}
							}
						});
						Promise.all([...servicePaymentUpdatePromise]);
					}
				})
				.then(() => {
					invalidateQuery();
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
							let paymentDate = form.watch(`start_date`);
							paymentDate = paymentDate ? format(paymentDate, 'yyyy-MM-dd') : '';
							if (!paymentDate) {
								return null;
							}
							const frequency = form.watch(`frequency`);
							const nextDueDate = addMonths(new Date(paymentDate), Number(frequency) * (index + 1));
							if (entry.payment_date) {
								const entryData = {
									...entry,
									service_uuid: itemData.uuid,
									created_at: getDateTime(),
									created_by: user?.uuid,
									next_due_date: nextDueDate,
									uuid: nanoid(),
								};
								return postData.mutateAsync({
									url: `/procure/service-payment`,
									newData: entryData,
								});
							}
						});
						Promise.all([...servicePaymentPromise]);
					}
				})
				.then(() => {
					invalidateQuery();
					invalidateServiceDetails();
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
			payment_date: undefined,
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
		if (generalNotesFields[index].uuid) {
			setDeleteItem({
				type: 'general_notes',
				id: generalNotesFields[index].uuid,
				name: generalNotesFields[index].id,
			});
			setChangeStatus((prev) => !prev);
		} else {
			removeGeneralNotes(index);
		}
		appendGeneralNotes({
			service_uuid: undefined,
			amount: 0,
			payment_date: undefined,
		});
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
					name='sub_category_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Sub Segment'
							placeholder='Select Sub Segment'
							menuPortalTarget={document.body}
							options={subCategoryList!}
							{...props}
						/>
					)}
				/>
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
							label={`Frequency (How many time need to pay per year )`}
							placeholder='Select frequency'
							menuPortalTarget={document.body}
							onChange={() => {
								setChangeStatus((prev) => !prev);
							}}
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
					render={(props) => <CoreForm.DatePicker {...props} />}
				/>
				<FormField
					control={form.control}
					name='end_date'
					render={(props) => <CoreForm.DatePicker {...props} />}
				/>
				<FormField
					control={form.control}
					name='cost_per_service'
					render={(props) => <CoreForm.Input type='number' {...props} />}
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
				fields={[
					...generalNotesFields.slice(
						0,
						Math.max(arraySize, generalNotesFields.filter((item) => item.payment_date !== undefined).length)
					),
				]}
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
