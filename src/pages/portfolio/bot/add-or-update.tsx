import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherUser } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { usePortfolioBot, usePortfolioBotByUUID } from '../_config/query';
import { BOT_NULL, BOT_SCHEMA, IBot } from '../_config/schema';
import { IBotAddOrUpdateProps } from '../_config/types';
import { categories, status } from './utils';

const AddOrUpdate: React.FC<IBotAddOrUpdateProps> = ({
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
	const { data } = usePortfolioBotByUUID(updatedData?.uuid as string);
	const { data: userOption } = useOtherUser<IFormSelectOption[]>();

	const { invalidateQuery: invalidateBotQuery } = usePortfolioBot();

	const categoryOption = categories;
	const statusOption = status;

	const form = useRHF(BOT_SCHEMA, BOT_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(BOT_NULL);
		invalidateBotQuery();
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
	async function onSubmit(values: IBot) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutateAsync({
				url: `portfolio/bot/${updatedData?.uuid}`,
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
			title={isUpdate ? 'Update Bot' : 'Add Bot'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='user_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='User' placeholder='Select user' options={userOption!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='user_designation'
				render={(props) => <CoreForm.Input label='Designation' {...props} />}
			/>
			<FormField
				control={form.control}
				name='category'
				render={(props) => (
					<CoreForm.ReactSelect
						label='category'
						placeholder='Select category'
						options={categoryOption!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='status'
				render={(props) => (
					<CoreForm.ReactSelect
						label='status'
						placeholder='Select status'
						options={statusOption!}
						{...props}
					/>
				)}
			/>

			<FormField control={form.control} name='description' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
