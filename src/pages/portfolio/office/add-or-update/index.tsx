import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { usePortfolioOffice, usePortfolioOfficeByUUID } from '../../_config/query';
import { IOffice, OFFICE_NULL, OFFICE_SCHEMA } from '../../_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { url: officeUrl, updateData, imageUpdateData, imagePostData, postData, deleteData } = usePortfolioOffice();

	const { data, invalidateQuery: invalidateTestDetails } = usePortfolioOfficeByUUID(uuid as string);

	const form = useRHF(OFFICE_SCHEMA, OFFICE_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'office_entries',
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: IOffice) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */
		if (isUpdate) {
			const office_data = {
				...values,
				updated_at: getDateTime(),
			};
			delete (office_data as { office_entries?: any })['office_entries'];
			const formData = Formdata<IOffice>(office_data);

			imageUpdateData
				.mutateAsync({
					url: `${officeUrl}/${uuid}`,
					updatedData: formData,
					isOnCloseNeeded: false,
				})
				.then(() => {
					const office_entries_promise = values.office_entries.map((item) => {
						if (item.uuid === undefined) {
							const newData = {
								...item,
								office_uuid: uuid,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
							};

							return postData.mutateAsync({
								url: '/portfolio/office-entry',
								newData: newData,
								isOnCloseNeeded: false,
							});
						} else {
							const updatedData = {
								...item,
								updated_at: getDateTime(),
							};
							return updateData.mutateAsync({
								url: `/portfolio/office-entry/${item.uuid}`,
								updatedData,
								isOnCloseNeeded: false,
							});
						}
					});

					Promise.all([...office_entries_promise]);
				})
				.then(() => form.reset(OFFICE_NULL))
				.then(() => {
					invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/portfolio/office`);
				})
				.catch((error) => {
					console.error('Error updating Office:', error);
				});

			return;
		}

		const new_office_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create Office description

		const office_data = {
			...values,
			uuid: new_office_uuid,
			created_at,
			created_by,
		};
		const formData = Formdata<IOffice>(office_data);
		// delete Office field from data to be sent

		if ('office_entries' in office_data) {
			delete (office_data as { office_entries?: any })['office_entries'];
		}

		// TODO: Update url and variable name ⬇️
		imagePostData
			.mutateAsync({
				url: officeUrl,
				newData: formData,
				isOnCloseNeeded: false,
			})
			.then(() => {
				// Create Office entries
				const office_entries = [...values.office_entries].map((item) => ({
					...item,
					office_uuid: new_office_uuid,
					uuid: nanoid(),
					created_at,
					created_by,
				}));

				const office_entries_promise = office_entries.map((item) =>
					postData.mutateAsync({
						url: `/portfolio/office-entry`,
						newData: item,
						isOnCloseNeeded: false,
					})
				);

				Promise.all([...office_entries_promise]);
			})
			.then(() => form.reset(OFFICE_NULL))
			.then(() => {
				invalidateTestDetails(); // TODO: Update invalidate query
				navigate(`/portfolio/office`);
			})
			.catch((error) => {
				console.error('Error adding Office:', error);
			});
	}

	const handleAdd = () => {
		append({
			user_uuid: '',
			designation: '',
			user_phone: '',
			user_email: '',
			remarks: '',
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		const user: string = String(form.getValues('office_entries')[index].user_uuid);
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: user,
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		// TODO: Update fields ⬇️
		const field = form.watch('office_entries')[index];
		append({
			user_uuid: field.user_uuid,
			designation: field.designation,
			user_phone: field.user_phone,
			user_email: field.user_email,
			remarks: field.remarks,
		});
	};

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Office Entry' : ' Add Office Entry'}
			form={form}
			onSubmit={onSubmit}
		>
			<Header isUpdate={isUpdate as boolean} />
			<CoreForm.DynamicFields
				title='Entry'
				form={form}
				fieldName='office_entries'
				fieldDefs={useGenerateFieldDefs({
					copy: handleCopy,
					remove: handleRemove,
					watch: form.watch,
				})}
				handleAdd={handleAdd}
				fields={fields}
			/>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/portfolio/office-entry`,
						deleteData,
						onClose: () => {
							form.setValue(
								'office_entries',
								form.getValues('office_entries').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
