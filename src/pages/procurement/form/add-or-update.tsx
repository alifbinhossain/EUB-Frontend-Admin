import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { useFormByUUID } from './config/query';
import { FORM_NULL, FORM_SCHEMA, IForm } from './config/schema';
import { IFormAddOrUpdateProps } from './config/types';

const AddOrUpdate: React.FC<IFormAddOrUpdateProps> = ({
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
	const { data } = useFormByUUID(updatedData?.uuid as string);

	const form = useRHF(FORM_SCHEMA, FORM_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(FORM_NULL);
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
	async function onSubmit(values: IForm) {
		const formData = Formdata<IForm>(values);

		if (isUpdate) {
			formData.append('updated_at', getDateTime());

			// UPDATE ITEM
			await imageUpdateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: formData,
				onClose,
			});

			return;
		} else {
			// ADD NEW ITEM
			formData.append('created_at', getDateTime());
			formData.append('created_by', user?.uuid || '');
			formData.append('uuid', nanoid());

			await imagePostData.mutateAsync({
				url: url,
				newData: formData,
				onClose,
			});
		}
	}

	return (
		<AddModal
			isSmall
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Form' : 'Add Form'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
				<div className='col-span-2 space-y-4'>
					<FormField
						control={form.control}
						name='name'
						render={(props) => <CoreForm.Input label='Name' {...props} />}
					/>
					<FormField
						control={form.control}
						name='remarks'
						render={(props) => <CoreForm.Textarea label='remarks' {...props} />}
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
