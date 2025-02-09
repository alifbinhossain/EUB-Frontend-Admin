import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherPrograms } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { usePortfolioTuitionFeeByUUID } from '../_config/query';
import { ITuitionFee, TUITION_FEE_NULL, TUITION_FEE_SCHEMA } from '../_config/schema';
import { ITuitionFeeAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<ITuitionFeeAddOrUpdateProps> = ({
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
	const { data } = usePortfolioTuitionFeeByUUID(updatedData?.uuid as string);
	const { data: programsOptions } = useOtherPrograms();

	const form = useRHF(TUITION_FEE_SCHEMA, TUITION_FEE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(TUITION_FEE_NULL);
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
	async function onSubmit(values: ITuitionFee) {
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
			title={isUpdate ? 'Update Tuition Fee' : 'Add Tuition Fee'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='title' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='program_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Program'
						placeholder='Select Program'
						options={programsOptions}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='admission_fee'
				render={(props) => <CoreForm.Input type='number' label='Admission Fee' {...props} />}
			/>
			<FormField
				control={form.control}
				name='tuition_fee_per_credit'
				render={(props) => <CoreForm.Input type='number' label='Tuition Fee Per Credit' {...props} />}
			/>
			<FormField
				control={form.control}
				name='student_activity_fee'
				render={(props) => (
					<CoreForm.Input type='number' label='Student Activity Fee Per Semester' {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='library_fee_per_semester'
				render={(props) => <CoreForm.Input type='number' label='Library Fee Per Semester' {...props} />}
			/>
			<FormField
				control={form.control}
				name='computer_lab_fee_per_semester'
				render={(props) => <CoreForm.Input type='number' label='Computer Lab Fee Per Semester' {...props} />}
			/>
			<FormField
				control={form.control}
				name='science_lab_fee_per_semester'
				render={(props) => <CoreForm.Input type='number' label='Science Lab Fee Per Semester' {...props} />}
			/>
			<FormField
				control={form.control}
				name='studio_lab_fee'
				render={(props) => <CoreForm.Input type='number' label='Studio Lab Fee' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
