import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import {
	useOtherBox,
	useOtherFloor,
	useOtherModel,
	useOtherProblem,
	useOtherRack,
	useOtherSize,
	useOtherUserByQuery,
	useOtherWarehouse,
} from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IOrderTableData } from '../_config/columns/columns.type';
import { useWorkJobsByUUID } from '../_config/query';
import { ORDER_NULL, ORDER_SCHEMA } from '../_config/schema';
import { IOrderAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IOrderAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;
	const { user } = useAuth();
	const { data } = useWorkJobsByUUID<IOrderTableData>(updatedData?.uuid as string);

	const { data: userOption } = useOtherUserByQuery<IFormSelectOption[]>('?type=customer');
	const { data: modelOption } = useOtherModel<IFormSelectOption[]>();
	const { data: sizeOption } = useOtherSize<IFormSelectOption[]>();
	const { data: problemOption } = useOtherProblem<IFormSelectOption[]>();
	const { data: warehouseOptions } = useOtherWarehouse<IFormSelectOption[]>();
	const { data: rackOption } = useOtherRack<IFormSelectOption[]>();
	const { data: floorOption } = useOtherFloor<IFormSelectOption[]>();
	const { data: boxOption } = useOtherBox<IFormSelectOption[]>();

	const form = useRHF(ORDER_SCHEMA, ORDER_NULL);
	const isProductReceived = form.watch('is_product_received');
	const isNewCustomer = form.watch('is_new_customer');

	const accessoriesOption = [
		{ label: 'Power Cable', value: 'power_cable' },
		{ label: 'HDMI Cable', value: 'hdmi_cable' },
		{ label: 'Remote', value: 'remote' },
		{ label: 'USB Cable', value: 'usb_cable' },
		{ label: 'Ethernet Cable', value: 'ethernet_cable' },
		{ label: 'Charger', value: 'charger' },
		{ label: 'Others', value: 'others' },
	];
	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	useEffect(() => {
		if (!isProductReceived) {
			form.resetField('receive_date');
			form.resetField('warehouse_uuid');
			form.resetField('rack_uuid');
			form.resetField('floor_uuid');
			form.resetField('box_uuid');
		}
	}, [isProductReceived, form]);

	useEffect(() => {
		if (!isNewCustomer) {
			form.resetField('user_uuid');
		} else {
			form.resetField('name');
			form.resetField('phone');
		}
	}, [isNewCustomer, form]);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(ORDER_NULL);
		setOpen(false);
	};

	// Submit handler
	async function onSubmit(values: IOrderTableData) {
		const payload = {
			...values,
			...(!isProductReceived && {
				receive_date: null,
				warehouse_uuid: null,
				rack_uuid: null,
				floor_uuid: null,
				box_uuid: null,
			}),
			...(isNewCustomer && !isUpdate && { user_uuid: null }),
		};

		if (isUpdate) {
			await updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...payload,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			const newCustomerId = isNewCustomer ? nanoid() : payload.user_uuid;
			await postData.mutateAsync({
				url,
				newData: {
					...payload,
					user_uuid: newCustomerId,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? `Update ${updatedData?.order_id} Order` : 'Add New Order'}
			form={form}
			isSmall={true}
			onSubmit={onSubmit}
		>
			<div className='flex justify-end gap-2'>
				<FormField
					control={form.control}
					name='is_new_customer'
					render={(props) => <CoreForm.Checkbox label='New Customer' {...props} />}
				/>
				<FormField
					control={form.control}
					name='is_product_received'
					render={(props) => <CoreForm.Checkbox label='Product Received' {...props} />}
				/>
			</div>

			<div className='flex space-x-4'>
				<div className='flex-1'>
					{!isNewCustomer ? (
						<FormField
							control={form.control}
							name='user_uuid'
							render={(props) => (
								<CoreForm.ReactSelect
									label='Customer'
									options={userOption || []}
									placeholder='Select Customer'
									{...props}
								/>
							)}
						/>
					) : (
						<div className='flex space-x-4'>
							<div className='flex-1'>
								<FormField
									control={form.control}
									name='name'
									render={(props) => <CoreForm.Input label='Customer Name' {...props} />}
								/>
							</div>
							<div className='flex-1'>
								<FormField
									control={form.control}
									name='phone'
									render={(props) => <CoreForm.Input label='Phone Number' {...props} />}
								/>
							</div>
						</div>
					)}
				</div>

				{isProductReceived && (
					<FormField
						control={form.control}
						name='receive_date'
						render={(props) => <CoreForm.DatePicker label='Receive Date' {...props} />}
					/>
				)}
			</div>

			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='model_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Model'
								options={modelOption || []}
								placeholder='Select Model'
								{...props}
							/>
						)}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='size_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Size'
								options={sizeOption || []}
								placeholder='Select Size'
								{...props}
							/>
						)}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='serial_no'
						render={(props) => <CoreForm.Input label='Serial Number' {...props} />}
					/>
				</div>
			</div>

			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='problems_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Problems'
								isMulti
								options={problemOption || []}
								placeholder='Select Problems'
								{...props}
							/>
						)}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='accessories'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Accessories'
								isMulti
								options={accessoriesOption}
								placeholder='Select Accessories'
								{...props}
							/>
						)}
					/>
				</div>
			</div>

			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='problem_statement'
						render={(props) => <CoreForm.Textarea label='Problem Statement' {...props} />}
					/>
				</div>
			</div>

			{isProductReceived && (
				<div className='grid grid-cols-4 gap-4'>
					<FormField
						control={form.control}
						name='warehouse_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Warehouse'
								options={warehouseOptions || []}
								placeholder='Select Warehouse'
								{...props}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name='rack_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Rack'
								options={rackOption || []}
								placeholder='Select Rack'
								{...props}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name='floor_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Floor'
								options={floorOption || []}
								placeholder='Select Floor'
								{...props}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name='box_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								label='Box'
								options={boxOption || []}
								placeholder='Select Box'
								{...props}
							/>
						)}
					/>
				</div>
			)}

			<FormField
				control={form.control}
				name='remarks'
				render={(props) => <CoreForm.Textarea label='Remarks' {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
