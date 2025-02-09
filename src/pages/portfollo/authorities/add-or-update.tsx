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

import { usePortfolioAuthorityByUUID } from '../_config/query';
import { AUTHORITIES_NULL, AUTHORITIES_SCHEMA, IAuthorities } from '../_config/schema';
import { IAuthoritiesAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IAuthoritiesAddOrUpdateProps> = ({
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
	const { data } = usePortfolioAuthorityByUUID(updatedData?.uuid as string);
	const { data: userOption } = useOtherUser<IFormSelectOption[]>();
	const categoryOptions = [
		{
			label: 'Chancellor',
			value: 'chancellor',
		},
		{
			label: 'Chairman',
			value: 'chairman',
		},
		{
			label: 'Vice Chancellor',
			value: 'vc',
		},
		{
			label: 'Pro Vice Chancellor',
			value: 'pro_vc',
		},
		{
			label: 'Dean',
			value: 'dean',
		},
		{
			label: 'Treasurer',
			value: 'treasurer',
		},
		{
			label: 'Director Coordination',
			value: 'director_coordination',
		},
		{
			label: 'Registrar',
			value: 'registrar',
		},
		{
			label: 'Undergraduate',
			value: 'undergraduate',
		},
		{
			label: 'Certificate',
			value: 'certificate',
		},
	];

	const form = useRHF(AUTHORITIES_SCHEMA, AUTHORITIES_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(AUTHORITIES_NULL);
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
	async function onSubmit(values: IAuthorities) {
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
			title={isUpdate ? 'Update Authorities' : 'Add Authorities'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='user_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='User' placeholder='Select User' options={userOption!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='category'
				render={(props) => (
					<CoreForm.ReactSelect placeholder='Select Category' options={categoryOptions} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='short_biography'
				render={(props) => <CoreForm.Textarea label='Short Biography' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
