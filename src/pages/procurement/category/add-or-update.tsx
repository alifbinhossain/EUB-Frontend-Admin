import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useVisitorByUUID } from './config/query';
import { IInquiryVisitor, PORTFOLIO_VISITOR_NULL, PORTFOLIO_VISITOR_SCHEMA } from './config/schema';
import { IVisitorAddOrUpdateProps } from './config/types';
import { category, status } from './utils';

const AddOrUpdate: React.FC<IVisitorAddOrUpdateProps> = ({
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
	const { data } = useVisitorByUUID(updatedData?.uuid as string);

	const form = useRHF(PORTFOLIO_VISITOR_SCHEMA, PORTFOLIO_VISITOR_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(PORTFOLIO_VISITOR_NULL);
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
	async function onSubmit(values: IInquiryVisitor) {
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
			<FormField
				control={form.control}
				name='category'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Category'
						placeholder='Select category'
						options={category!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='status'
				render={(props) => (
					<CoreForm.ReactSelect label='Status' placeholder='Select status' options={status!} {...props} />
				)}
			/>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='mobile' render={(props) => <CoreForm.Input {...props} />} />

			{form.watch('category') === 'call_entry' ? (
				<div className='flex flex-col gap-4'>
					<FormField
						control={form.control}
						name='subject_preference'
						render={(props) => <CoreForm.Input {...props} />}
					/>
					<FormField
						control={form.control}
						name='from_where'
						render={(props) => <CoreForm.Input {...props} />}
					/>
				</div>
			) : (
				<div className='flex flex-col gap-4'>
					<FormField
						control={form.control}
						name='prev_institution'
						render={(props) => <CoreForm.Input {...props} />}
					/>

					<FormField
						control={form.control}
						name='department'
						render={(props) => <CoreForm.Input {...props} />}
					/>
					<FormField
						control={form.control}
						name='through'
						render={(props) => <CoreForm.Input {...props} />}
					/>
				</div>
			)}

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
