import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherFaculty } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useDepartmentsByUUID } from '../_config/query';
import { IPortfolioDepartment, PORTFOLIO_DEPARTMENT_NULL, PORTFOLIO_DEPARTMENT_SCHEMA } from '../_config/schema';
import { IDepartmentAddOrUpdateProps } from '../_config/types';
import { categories, short_names } from './utils';

const AddOrUpdate: React.FC<IDepartmentAddOrUpdateProps> = ({
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
	const { data } = useDepartmentsByUUID(updatedData?.uuid as string);
	const { data: faculties } = useOtherFaculty<IFormSelectOption[]>();

	const form = useRHF(PORTFOLIO_DEPARTMENT_SCHEMA, PORTFOLIO_DEPARTMENT_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(PORTFOLIO_DEPARTMENT_NULL);
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
	async function onSubmit(values: IPortfolioDepartment) {
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
			title={isUpdate ? 'Update Department' : 'Add Department'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='page_link' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='short_name'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Short Name'
						placeholder='Select short name'
						options={short_names!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='faculty_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Faculty'
						placeholder='Select Faculty'
						options={faculties!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='category'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Category'
						placeholder='Select Category'
						options={categories!}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
