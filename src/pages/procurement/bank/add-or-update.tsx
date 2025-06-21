import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherCategory } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useBankByUUID } from './config/query';
import { BANK_NULL, BANK_SCHEMA, IBank } from './config/schema';
import { IBankAddOrUpdateProps } from './config/types';
import { names } from './utils';

const AddOrUpdate: React.FC<IBankAddOrUpdateProps> = ({
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
	const { data } = useBankByUUID(updatedData?.uuid as string);
	const { invalidateQuery: invalidateQueryCategory } = useOtherCategory();

	const form = useRHF(BANK_SCHEMA, BANK_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(BANK_NULL);
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
	async function onSubmit(values: IBank) {
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
			invalidateQueryCategory();
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
			invalidateQueryCategory();
		}
	}
	// name: '',
	// swift_code: '',
	// address: '',
	// routing_no: '',
	// account_no: '',
	// remarks: null,
	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Bank' : 'Add Bank'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='swift_code' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='address' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='routing_no' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='account_no' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
