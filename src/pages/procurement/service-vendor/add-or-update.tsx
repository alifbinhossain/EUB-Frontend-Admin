import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useServiceVendorByUUID } from './config/query';
import { IServiceVendor, SERVICE_VENDOR_NULL, SERVICE_VENDOR_SCHEMA } from './config/schema';
import { IServiceVendorAddOrUpdateProps } from './config/types';

const AddOrUpdate: React.FC<IServiceVendorAddOrUpdateProps> = ({
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
	const { data } = useServiceVendorByUUID(updatedData?.uuid as string);

	const form = useRHF(SERVICE_VENDOR_SCHEMA, SERVICE_VENDOR_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(SERVICE_VENDOR_NULL);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IServiceVendor) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			postData.mutateAsync({
				url,
				newData: {
					...values,
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
			title={isUpdate ? 'Update General Note' : 'Add General Note'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='is_selected' render={(props) => <CoreForm.Checkbox {...props} />} />
			<FormField
				control={form.control}
				name='service_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Service' placeholder='Select Service' options={[]} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='vendor_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Vendor' placeholder='Select Vendor' options={[]} {...props} />
				)}
			/>

			<FormField
				control={form.control}
				name='amount'
				render={(props) => <CoreForm.Input type='number ' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
