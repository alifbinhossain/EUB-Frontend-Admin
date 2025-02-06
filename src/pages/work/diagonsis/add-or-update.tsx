import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherProblem, useOtherSection } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IDiagnosisTableData } from '../_config/columns/columns.type';
import { useWorkDiagnosisByUUID } from '../_config/query';
import { DIAGNOSIS_NULL, DIAGNOSIS_SCHEMA } from '../_config/schema';
import { IDiagnosisAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IDiagnosisAddOrUpdateProps> = ({
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
	const { data } = useWorkDiagnosisByUUID<IDiagnosisTableData>(updatedData?.uuid as string);
	const { data: problemOption } = useOtherProblem<IFormSelectOption[]>();
	const { data: sectionOption } = useOtherSection<IFormSelectOption[]>();
	const statusOption = [
		{ label: 'Pending', value: 'pending' },
		{ label: 'Rejected', value: 'rejected' },
		{ label: 'Accepted', value: 'accepted' },
		{ label: 'Not Repairable', value: 'not_repairable' },
	];

	const form = useRHF(DIAGNOSIS_SCHEMA, DIAGNOSIS_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(DIAGNOSIS_NULL);
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
	async function onSubmit(values: IDiagnosisTableData) {
		// UPDATE ITEM
		updateData.mutateAsync({
			url: `${url}/${updatedData?.uuid}`,
			updatedData: {
				...values,
				updated_at: getDateTime(),
				engineer_uuid: user?.uuid,
				status_update_date: data?.status !== values.status ? getDateTime() : data?.status_update_date,
			},
			onClose,
		});
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={`Update Diagnosis of ${updatedData?.diagnosis_id}(${updatedData?.order_id}) `}
			isSmall={true}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='problems_uuid'
						render={(props) => (
							<CoreForm.ReactSelect
								isMulti={true}
								label='Problem'
								placeholder='Select Problems'
								options={problemOption!}
								{...props}
							/>
						)}
					/>
				</div>
			</div>

			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='problem_statement'
						render={(props) => <CoreForm.Textarea label='Problem Statement' {...props} />}
					/>
				</div>
			</div>
			<div className='flex space-x-4'>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='status'
						render={(props) => <CoreForm.ReactSelect options={statusOption!} label='Status' {...props} />}
					/>
				</div>
				<div className='flex-1'>
					<FormField
						control={form.control}
						name='proposed_cost'
						render={(props) => <CoreForm.Input type='number' label='Proposed Cost' {...props} />}
					/>
				</div>
			</div>
			<div className='flex'>
				<FormField
					control={form.control}
					name='is_proceed_to_repair'
					render={(props) => <CoreForm.Checkbox label='Proceed to Repair' className='h-5' {...props} />}
				/>
			</div>
			{form.watch('is_proceed_to_repair') && (
				<div className='flex space-x-4'>
					<div className='flex-1'>
						<FormField
							control={form.control}
							name='section_uuid'
							render={(props) => (
								<CoreForm.ReactSelect
									isMulti={true}
									label='Section'
									placeholder='Select Section'
									options={sectionOption!}
									{...props}
								/>
							)}
						/>
					</div>
				</div>
			)}
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
