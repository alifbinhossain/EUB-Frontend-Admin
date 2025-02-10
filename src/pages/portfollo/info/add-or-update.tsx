import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { PORTFOLIO_PAGE_NAME } from '@/types/enum';
import { useOtherPortfolioDepartments } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import enumToOptions from '@/utils/enumToOptions';
import Formdata from '@/utils/formdata';

import { useInfoByUUID } from '../_config/query';
import { IInfo, INFO_NULL, INFO_SCHEMA } from '../_config/schema';
import { IInfoAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IInfoAddOrUpdateProps> = ({
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
	const { data } = useInfoByUUID(updatedData?.uuid as string);

	const { data: departments } = useOtherPortfolioDepartments<IFormSelectOption[]>();

	const page_names = enumToOptions(PORTFOLIO_PAGE_NAME);

	const form = useRHF(INFO_SCHEMA, INFO_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(INFO_NULL);
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
	async function onSubmit(values: IInfo) {
		const formData = Formdata<IInfo>(values);

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
				url,
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
			title={isUpdate ? 'Update Info' : 'Add Info'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
				<div className='col-span-2 space-y-4'>
					<FormField
						control={form.control}
						name='department_uuid'
						render={(props) => (
							<CoreForm.ReactSelect label='Department' options={departments!} {...props} />
						)}
					/>

					<FormField
						control={form.control}
						name='page_name'
						render={(props) => <CoreForm.ReactSelect label='Page Name' options={page_names!} {...props} />}
					/>

					<FormField
						control={form.control}
						name='description'
						render={(props) => <CoreForm.Textarea rows={4} {...props} />}
					/>

					<FormField
						control={form.control}
						name='remarks'
						render={(props) => <CoreForm.Textarea {...props} />}
					/>

					<FormField
						control={form.control}
						name='is_global'
						render={(props) => <CoreForm.Checkbox label='Global' {...props} />}
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
