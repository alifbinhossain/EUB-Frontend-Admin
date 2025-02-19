import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useOffersByUUID } from '../_config/query';
import { IOffers, OFFERS_NULL, OFFERS_SCHEMA } from '../_config/schema';
import { IOffersAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IOffersAddOrUpdateProps> = ({
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
	const { data } = useOffersByUUID(updatedData?.uuid as string);

	const form = useRHF(OFFERS_SCHEMA, OFFERS_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(OFFERS_NULL);
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
	async function onSubmit(values: IOffers) {
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
			title={isUpdate ? 'Update Club' : 'Add Club'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='serial'
				render={(props) => <CoreForm.Input {...props} type='number' />}
			/>
			<FormField control={form.control} name='title' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='subtitle' render={(props) => <CoreForm.Input {...props} />} />

			<FormField control={form.control} name='deadline' render={(props) => <CoreForm.DatePicker {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
