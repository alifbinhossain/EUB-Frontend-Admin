import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { useOffersByUUID } from '../_config/query';
import { IOffers, OFFERS_NULL, OFFERS_SCHEMA } from '../_config/schema';
import { IOffersAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IOffersAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	imagePostData,
	imageUpdateData,
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
		const formData = Formdata<IOffers>(values);
		if (isUpdate) {
			formData.append('updated_at', getDateTime());
			// UPDATE ITEM
			imageUpdateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			formData.append('created_at', getDateTime());
			formData.append('created_by', user?.uuid || '');
			formData.append('uuid', nanoid());
			imagePostData.mutateAsync({
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
			title={isUpdate ? 'Update Offers' : 'Add Offers'}
			isSmall={true}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
				<div className='col-span-2 space-y-4'>
					<FormField
						control={form.control}
						name='serial'
						render={(props) => <CoreForm.Input {...props} type='number' />}
					/>
					<FormField control={form.control} name='title' render={(props) => <CoreForm.Input {...props} />} />
					<FormField
						control={form.control}
						name='subtitle'
						render={(props) => <CoreForm.Input {...props} />}
					/>

					<FormField
						control={form.control}
						name='deadline'
						render={(props) => <CoreForm.DatePicker {...props} />}
					/>
					<FormField
						control={form.control}
						name='remarks'
						render={(props) => <CoreForm.Textarea {...props} />}
					/>
				</div>
				<FormField
					control={form.control}
					name='file'
					render={(props) => (
						<CoreForm.FileUpload
							label='File'
							fileType='document'
							errorText='File must be less than 10MB and of type pdf, doc, docx'
							isUpdate={isUpdate}
							options={{
								maxSize: 10000000,
							}}
							{...props}
						/>
					)}
				/>
			</div>
		</AddModal>
	);
};

export default AddOrUpdate;
