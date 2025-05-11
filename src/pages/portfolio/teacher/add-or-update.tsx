import { useEffect } from 'react';
import { IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherUser } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { ITeacherTableData } from '../_config/columns/columns.type';
import { useTeachersByUUID } from '../_config/query';
import { ITeacher, TEACHER_NULL, TEACHER_SCHEMA } from '../_config/schema';

interface IAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: ITeacherTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
	postData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	updateData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

const AddOrUpdate: React.FC<IAddOrUpdateProps> = ({
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
	const { data } = useTeachersByUUID(updatedData?.uuid as string);

	const { data: users } = useOtherUser<IFormSelectOption[]>();

	const form = useRHF(TEACHER_SCHEMA, TEACHER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(TEACHER_NULL);
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
	async function onSubmit(values: ITeacher) {
		// TODO: Update type here
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

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
				url, // TODO: Update url here if needed
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
			title={isUpdate ? 'Update Teacher' : 'Add Teacher'}
			form={form}
			onSubmit={onSubmit}
			isSmall
		>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='teacher_initial'
					render={(props) => <CoreForm.Input label='Initial' {...props} />}
				/>
				<FormField
					control={form.control}
					name='teacher_uuid'
					render={(props) => <CoreForm.ReactSelect label='Select User' options={users!} {...props} />}
				/>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='teacher_phone'
					render={(props) => <CoreForm.Input label='Phone' {...props} />}
				/>
				<FormField
					control={form.control}
					name='teacher_email'
					render={(props) => <CoreForm.Input label='Email' {...props} />}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='appointment_date'
					render={(props) => <CoreForm.DatePicker {...props} />}
				/>
				<FormField
					control={form.control}
					name='resign_date'
					render={(props) => <CoreForm.DatePicker {...props} />}
				/>
			</div>

			<FormField
				control={form.control}
				name='education'
				render={(props) => <CoreForm.RichTextEditor {...props} />}
			/>
			<FormField control={form.control} name='about' render={(props) => <CoreForm.RichTextEditor {...props} />} />

			<FormField
				control={form.control}
				name='publication'
				render={(props) => <CoreForm.RichTextEditor {...props} />}
			/>

			<FormField
				control={form.control}
				name='journal'
				render={(props) => <CoreForm.RichTextEditor {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
