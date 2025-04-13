import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherCategory, useOtherUser } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useInternalCostCenterByUUID } from './config/query';
import { IInternalCostCenter, INTERNAL_COST_CENTER_NULL, INTERNAL_COST_CENTER_SCHEMA } from './config/schema';
import { IInternalCostCenterAddOrUpdateProps } from './config/types';
import { types } from './utils';

const AddOrUpdate: React.FC<IInternalCostCenterAddOrUpdateProps> = ({
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
	const { data } = useInternalCostCenterByUUID(updatedData?.uuid as string);
	const { invalidateQuery: invalidateQueryCategory } = useOtherCategory();
	const { data: userOption } = useOtherUser<IFormSelectOption[]>();

	const form = useRHF(INTERNAL_COST_CENTER_SCHEMA, INTERNAL_COST_CENTER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(INTERNAL_COST_CENTER_NULL);
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
	async function onSubmit(values: IInternalCostCenter) {
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

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Internal Cost Center' : 'Add Internal Cost Center'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='authorized_person_uuid'
				render={(props) => <CoreForm.ReactSelect label='Authorized Person' options={userOption!} {...props} />}
			/>
			<FormField
				control={form.control}
				name='type'
				render={(props) => (
					<CoreForm.ReactSelect label='Type' placeholder='Select Type' options={types!} {...props} />
				)}
			/>
			<FormField control={form.control} name='from' render={(props) => <CoreForm.DatePicker {...props} />} />
			<FormField control={form.control} name='to' render={(props) => <CoreForm.DatePicker {...props} />} />
			<FormField
				control={form.control}
				name='budget'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
