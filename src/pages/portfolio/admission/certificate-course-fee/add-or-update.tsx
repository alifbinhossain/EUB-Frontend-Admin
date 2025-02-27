import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherPrograms } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { usePortfolioCertificateCourseFeeByUUID } from '../_config/query';
import { CERTIFICATE_COURSE_FEE_NULL, CERTIFICATE_COURSE_FEE_SCHEMA, ICertificateCourseFee } from '../_config/schema';
import { ICertificateCourseFeeAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<ICertificateCourseFeeAddOrUpdateProps> = ({
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
	const { data } = usePortfolioCertificateCourseFeeByUUID(updatedData?.uuid as string);
	const { data: programsOptions } = useOtherPrograms<IFormSelectOption[]>();

	const form = useRHF(CERTIFICATE_COURSE_FEE_SCHEMA, CERTIFICATE_COURSE_FEE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(CERTIFICATE_COURSE_FEE_NULL);
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
	async function onSubmit(values: ICertificateCourseFee) {
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
			title={isUpdate ? 'Update Certificate Course Fee' : 'Add Certificate Course Fee'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='programs_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Program'
						placeholder='Select Program'
						options={programsOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='fee_per_course'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
