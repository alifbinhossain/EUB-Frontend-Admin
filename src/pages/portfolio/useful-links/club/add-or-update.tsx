import { useEffect } from 'react';
import useAccess from '@/hooks/useAccess';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherDepartments, useOtherUser } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import getAccess from '@/utils/getAccess';

import { useClubsByUUID } from '../_config/query';
import { CLUB_NULL, CLUB_SCHEMA, IClub } from '../_config/schema';
import { IClubAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IClubAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;
	const hasAccess: string[] = useAccess('portfolio__club') as string[];
	const { user } = useAuth();
	const { data } = useClubsByUUID(updatedData?.uuid as string);
	const { data: departments } = useOtherDepartments<IFormSelectOption[]>(getAccess(hasAccess));
	const { data: users } = useOtherUser<IFormSelectOption[]>();

	const form = useRHF(CLUB_SCHEMA, CLUB_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(CLUB_NULL);
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
	async function onSubmit(values: IClub) {
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
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='department_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Department'
						placeholder='Select Department'
						options={departments!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='president_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='President'
						placeholder='Select President'
						options={users!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='president_email'
				render={(props) => <CoreForm.Input label='Email' {...props} />}
			/>
			<FormField
				control={form.control}
				name='president_phone'
				render={(props) => <CoreForm.Input label='Phone' {...props} />}
			/>
			<FormField control={form.control} name='message' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
