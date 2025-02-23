import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { ITender, TENDER_NULL, TENDER_SCHEMA } from '../_config/schema';
import { ITenderAddOrUpdateProps } from '../_config/types';
import { usePortfolioTenderByUUID } from '../../_config/query';
import { tableNames } from './utills';

const AddOrUpdate: React.FC<ITenderAddOrUpdateProps> = ({
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	imagePostData,
	imageUpdateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = usePortfolioTenderByUUID(updatedData?.uuid as string);

	const tableNameOptions = tableNames;

	const form = useRHF(TENDER_SCHEMA, TENDER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(TENDER_NULL);
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
	async function onSubmit(values: ITender) {
		const formData = Formdata<ITender>(values);

		if (isUpdate) {
			formData.append('updated_at', getDateTime());

			// UPDATE ITEM
			await imageUpdateData.mutateAsync({
				url: `/portfolio/tender/${updatedData?.uuid}`,
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
				url: '/portfolio/tender',
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
			title={isUpdate ? 'Update Routine' : 'Add Routine'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
				<div className='col-span-2 space-y-4'>
					<FormField
						control={form.control}
						name='table_name'
						render={(props) => (
							<CoreForm.ReactSelect label='Department' options={tableNameOptions!} {...props} />
						)}
					/>
					<FormField
						control={form.control}
						name='code'
						render={(props) => <CoreForm.Input label='Code' {...props} />}
					/>
					<FormField
						control={form.control}
						name='type'
						render={(props) => <CoreForm.Input label='Type' {...props} />}
					/>
					<FormField
						control={form.control}
						name='title'
						render={(props) => <CoreForm.Input label='Title' {...props} />}
					/>
					<FormField
						control={form.control}
						name='published_date'
						render={(props) => <CoreForm.DatePicker label='Published Date' {...props} />}
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
