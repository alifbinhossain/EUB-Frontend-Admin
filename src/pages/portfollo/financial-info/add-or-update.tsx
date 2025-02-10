import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherPortfolioDepartments } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { usePortfolioFinancialInformationByUUID } from '../_config/query';
import {
	FINANCIAL_INFORMATION_NULL,
	FINANCIAL_INFORMATION_SCHEMA,
	IPortfolioFinancialInformation,
} from '../_config/schema';
import { IFinancialInformationAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IFinancialInformationAddOrUpdateProps> = ({
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
	const { data } = usePortfolioFinancialInformationByUUID(updatedData?.uuid as string);
	const { data: departmentOptions } = useOtherPortfolioDepartments<IFormSelectOption[]>();

	const form = useRHF(FINANCIAL_INFORMATION_SCHEMA, FINANCIAL_INFORMATION_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(FINANCIAL_INFORMATION_NULL);
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
	async function onSubmit(values: IPortfolioFinancialInformation) {
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
			title={isUpdate ? 'Update Financial Information' : 'Add Financial Information'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='department_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Department'
						placeholder='Select Department'
						options={departmentOptions!}
						{...props}
					/>
				)}
			/>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='total_credit'
					render={(props) => <CoreForm.Input type='number' label='Total Credit' {...props} />}
				/>
				<FormField
					control={form.control}
					name='total_cost'
					render={(props) => <CoreForm.Input type='number' label='Total Cost' {...props} />}
				/>
				<FormField
					control={form.control}
					name='admission_fee'
					render={(props) => <CoreForm.Input type='number' label='Admission Fee' {...props} />}
				/>
				<FormField
					control={form.control}
					name='waiver_50'
					render={(props) => <CoreForm.Input type='number' label='Waiver 50' {...props} />}
				/>
				<FormField
					control={form.control}
					name='waiver_55'
					render={(props) => <CoreForm.Input type='number' label='Waiver 55' {...props} />}
				/>
				<FormField
					control={form.control}
					name='waiver_60'
					render={(props) => <CoreForm.Input type='number' label='Waiver 60' {...props} />}
				/>
				<FormField
					control={form.control}
					name='waiver_65'
					render={(props) => <CoreForm.Input type='number' label='Waiver 65' {...props} />}
				/>
				<FormField
					control={form.control}
					name='waiver_70'
					render={(props) => <CoreForm.Input type='number' label='Waiver 70' {...props} />}
				/>
				<FormField
					control={form.control}
					name='waiver_75'
					render={(props) => <CoreForm.Input type='number' label='Waiver 75' {...props} />}
				/>
				<FormField
					control={form.control}
					name='waiver_80'
					render={(props) => <CoreForm.Input type='number' label='Waiver 80' {...props} />}
				/>
				<FormField
					control={form.control}
					name='waiver_85'
					render={(props) => <CoreForm.Input type='number' label='Waiver 85' {...props} />}
				/>
				<FormField
					control={form.control}
					name='waiver_90'
					render={(props) => <CoreForm.Input type='number' label='Waiver 90' {...props} />}
				/>
				<FormField
					control={form.control}
					name='waiver_95'
					render={(props) => <CoreForm.Input type='number' label='Waiver 95' {...props} />}
				/>
				<FormField
					control={form.control}
					name='waiver_100'
					render={(props) => <CoreForm.Input type='number' label='Waiver 100' {...props} />}
				/>
			</div>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
