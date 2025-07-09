import { lazy, Suspense, use, useCallback, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { ShowLocalToast } from '@/components/others/toast';
import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { useBill, useBillByDetails } from '../config/query';
import { BILL_NULL, BILL_SCHEMA, IBill } from '../config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';
import useGenerateFieldDefsItemWorkOrder from './useGenerateFieldDefsItemWorkOrder';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { url: billUrl, updateData, imageUpdateData, postData, deleteData } = useBill();

	const { data, invalidateQuery: invalidateTestDetails } = useBillByDetails<IBill>(uuid as string);

	const form = useRHF(BILL_SCHEMA, BILL_NULL);
	// const { data: itemWorkOrderData } = useItemWorkOrderByVendorUUID<IProcureStoreTableData[]>(
	// 	`${form.watch('vendor_uuid') || ''}`
	// );

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'bill_payment',
	});
	const {
		fields: itemWorkOrderFileds,
		append: itemWorkOrderAppend,
		remove: itemWorkOrderRemove,
	} = useFieldArray({
		control: form.control,
		name: 'item_work_order',
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: IBill) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */
		if (values.bill_payment.length === 0) {
			ShowLocalToast({
				toastType: 'error',
				message: 'Please add at least one entry',
			});
			return;
		}
		if (isUpdate) {
			const bill_data = {
				...values,
				updated_at: getDateTime(),
			};

			const test_promise = await updateData.mutateAsync({
				url: `${billUrl}/${uuid}`,
				updatedData: bill_data,
				isOnCloseNeeded: false,
			});

			const bill_payment_promise = values.bill_payment.map((item) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						bill_uuid: uuid,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/procure/bill-payment',
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `/procure/bill-payment/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});
			const item_work_order_uuid_promise = values.item_work_order?.map((item) => {
				const updatedData = {
					uuid: item?.uuid,
					bill_uuid: uuid,
					updated_at: getDateTime(),
				};
				const formData = Formdata(updatedData);
				return imageUpdateData.mutateAsync({
					url: `/procure/item-work-order/${item?.uuid}`,
					updatedData: formData,
					isOnCloseNeeded: false,
				});
			});

			try {
				await Promise.all([test_promise, ...bill_payment_promise, ...item_work_order_uuid_promise])
					.then(() => form.reset(BILL_NULL))
					.then(() => {
						invalidateTestDetails(); // TODO: Update invalidate query
						navigate(`/procurement/bill`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		const new_bill_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create purchase description

		const bill_data = {
			...values,
			uuid: new_bill_uuid,
			created_at,
			created_by,
		};

		// delete purchase field from data to be sent

		if ('bill_payment' in bill_data) {
			delete (bill_data as { bill_payment?: any })['bill_payment'];
		}

		// TODO: Update url and variable name ⬇️
		const purchase_promise = await postData.mutateAsync({
			url: billUrl,
			newData: bill_data,
			isOnCloseNeeded: false,
		});

		// Create purchase entries
		const bill_payment_entries = [...values.bill_payment].map((item) => ({
			...item,
			bill_uuid: new_bill_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const bill_payment_entries_promise = bill_payment_entries.map((item) =>
			postData.mutateAsync({
				url: '/procure/bill-payment',
				newData: item,
				isOnCloseNeeded: false,
			})
		);
		const item_work_order_uuid_promise = values.item_work_order?.map((item) => {
			const updatedData = {
				uuid: item?.uuid,
				bill_uuid: new_bill_uuid,
				updated_at: getDateTime(),
			};
			const formData = Formdata(updatedData);
			return imageUpdateData.mutateAsync({
				url: `/procure/item-work-order/${item?.uuid}`,
				updatedData: formData,
				isOnCloseNeeded: false,
			});
		});

		try {
			await Promise.all([purchase_promise, ...bill_payment_entries_promise, ...item_work_order_uuid_promise])
				.then(() => form.reset(BILL_NULL))
				.then(() => {
					invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/procurement/bill`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const handleAdd = () => {
		append({
			uuid: undefined,
			type: 'full',
			amount: 0,
			payment_date: getDateTime(),
			payment_method: 'cash',
		});
	};

	const handleItemWorkOrderAppend = () => {
		itemWorkOrderAppend({
			uuid: '',
			total_amount: 0,
		});
	};
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: fields[index].type,
			});
		} else {
			remove(index);
		}
	};
	const handleRemoveItemWorkOrder = (index: number) => {
		if (itemWorkOrderFileds[index].bill_uuid) {
			const removeData = {
				uuid: itemWorkOrderFileds[index].uuid,
				bill_uuid: '',
				updated_at: getDateTime(),
			};
			const formData = Formdata(removeData);

			imageUpdateData.mutateAsync({
				url: `/procure/item-work-order/${itemWorkOrderFileds[index].uuid}`,
				updatedData: formData,
				isOnCloseNeeded: false,
			});
		} else {
			itemWorkOrderRemove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		// TODO: Update fields ⬇️
		const field = form.watch('bill_payment')[index];
		append({
			type: field.type,
			amount: field.amount,
			payment_date: field.payment_date,
			payment_method: field.payment_method,
		});
	};
	const total = useCallback(
		() =>
			form.getValues()?.bill_payment?.reduce(
				(acc, curr) => {
					acc.grand_total_amount += Number(curr.amount);
					return acc;
				},
				{
					grand_total_amount: 0,
				}
			),
		[form.watch('bill_payment')] // eslint-disable-line react-hooks/exhaustive-deps
	);
	const totalItemAmount = useCallback(
		() =>
			form.getValues()?.item_work_order?.reduce(
				(acc, curr) => {
					acc.grand_total_amount += Number(curr.total_amount);
					return acc;
				},
				{
					grand_total_amount: 0,
				}
			),
		[form.watch('item_work_order')] // eslint-disable-line react-hooks/exhaustive-deps
	);
	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Bill Entry' : ' Add Bill Entry'}
			form={form}
			onSubmit={onSubmit}
		>
			<Header
				vendor_uuid={data?.vendor_uuid || ''}
				// bank_uuid={data?.bank_uuid || ''}
				is_completed={data?.is_completed || false}
				item_work_order={data?.item_work_order || []}
				bill_payment={data?.bill_payment || []}
				completed_date={data?.completed_date}
				isUpdate={isUpdate}
			/>
			<CoreForm.DynamicFields
				title='Item Work Order'
				form={form}
				fieldName='item_work_order'
				fieldDefs={useGenerateFieldDefsItemWorkOrder({
					remove: handleRemoveItemWorkOrder,
					watch: form.watch,
					form,
					isUpdate,
					data: data ? data : BILL_NULL,
				})}
				handleAdd={data?.is_completed ? undefined : handleItemWorkOrderAppend}
				fields={itemWorkOrderFileds}
			>
				<tr>
					<td className='border-t text-right font-semibold' colSpan={1}>
						Grand Total:
					</td>

					<td className='border-t px-3 py-2' colSpan={2}>
						{totalItemAmount()?.grand_total_amount}
					</td>
				</tr>
			</CoreForm.DynamicFields>
			<CoreForm.DynamicFields
				title='Bill Payment'
				form={form}
				fieldName='bill_payment'
				fieldDefs={useGenerateFieldDefs({
					copy: handleCopy,
					remove: handleRemove,
					watch: form.watch,
					form,
					data,
				})}
				handleAdd={data?.is_completed ? undefined : handleAdd}
				fields={fields}
			>
				<tr>
					<td className='border-t text-right font-semibold' colSpan={1}>
						Grand Total:
					</td>

					<td className='border-t px-3 py-2'>{total()?.grand_total_amount}</td>
					<td className='border-t text-right font-semibold' colSpan={1}>
						Due:
					</td>
					<td className='border-t px-3 py-2' colSpan={3}>
						{totalItemAmount()?.grand_total_amount - total()?.grand_total_amount}
					</td>
				</tr>
			</CoreForm.DynamicFields>
			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/procure/bill-payment`,
						deleteData,
						onClose: () => {
							form.setValue(
								'bill_payment',
								form.getValues('bill_payment').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
