import { Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAccess from '@/hooks/useAccess';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { DeleteModal } from '@/components/core/modal';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherDepartments } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';
import getAccess from '@/utils/getAccess';

import { useNews, useNewsDetails } from '../_config/query';
import { INews, NEWS_NULL, NEWS_SCHEMA } from '../_config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';

export default function NewsEntry() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const hasAccess: string[] = useAccess('portfolio__news') as string[];
	const {
		data,
		deleteData,
		imagePostData,
		imageUpdateData,
		invalidateQuery: invalidateNews,
	} = useNewsDetails(uuid as string);
	const { data: departments } = useOtherDepartments<IFormSelectOption[]>(getAccess(hasAccess));
	const { invalidateQuery } = useNews(getAccess(hasAccess));

	const form = useRHF(NEWS_SCHEMA, NEWS_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'entry',
	});

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: INews) {
		if (values.entry.length === 0) {
			alert('Add at least one entry with an image');
			return;
		}
		const formData = Formdata<INews>(values);

		if (isUpdate) {
			formData.append('updated_at', getDateTime());

			// UPDATE ITEM
			imageUpdateData
				.mutateAsync({
					url: `/portfolio/news/${uuid}`,
					updatedData: formData,
				})
				.then(() => {
					const entryUpdatePromise = values.entry
						.filter((entry) => entry.documents !== '')
						.map((entry) => {
							const updatedFormData = Formdata(entry);

							if (updatedFormData.get('uuid')) {
								updatedFormData.append('updated_at', getDateTime());
								return imageUpdateData.mutateAsync({
									url: `portfolio/news-entry/${updatedFormData.get('uuid')}`,
									updatedData: updatedFormData,
								});
							} else {
								updatedFormData.append('created_at', getDateTime());
								updatedFormData.append('created_by', user?.uuid || '');
								updatedFormData.append('uuid', nanoid());
								updatedFormData.append('news_uuid', uuid);
								return imagePostData.mutateAsync({
									url: `portfolio/news-entry`,
									newData: updatedFormData,
								});
							}
						});

					Promise.all(entryUpdatePromise);
				})
				.then(() => {
					invalidateQuery();
					invalidateNews();
					navigate('/portfolio/news');
				})
				.catch((error) => {
					console.error('Error updating news:', error);
				});
		} else {
			formData.append('created_at', getDateTime());
			formData.append('created_by', user?.uuid || '');
			formData.append('uuid', nanoid());

			// ADD NEW ITEM
			imagePostData
				.mutateAsync({
					url: '/portfolio/news',
					newData: formData,
				})
				.then(() => {
					const entryPromise = values.entry
						.filter((entry) => entry.documents !== '')
						.map((entry) => {
							const entryFormData = Formdata(entry);
							entryFormData.append('created_at', getDateTime());
							entryFormData.append('created_by', user?.uuid || '');
							entryFormData.append('uuid', nanoid());
							entryFormData.append('news_uuid', formData.get('uuid') as string);

							return imagePostData.mutateAsync({
								url: `portfolio/news-entry`,
								newData: entryFormData,
							});
						});

					Promise.all([...entryPromise]);
				})
				.then(() => {
					invalidateQuery();
					invalidateNews();
					navigate('/portfolio/news');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}

	const handleAdd = () => {
		append({
			documents: '',
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleRemove = (index: number) => {
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: fields[index].id,
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		const field = form.watch('entry')[index];
		append({
			documents: field.documents,
		});
	};

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Edit News' : 'Add News'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section
				title='Information'
				extraHeader={
					<div className='flex items-center gap-2 text-gray-300'>
						<FormField
							control={form.control}
							name='is_global'
							render={(props) => <CoreForm.Checkbox label='Global' className='bg-slate-300' {...props} />}
						/>
					</div>
				}
				className='flex flex-col'
			>
				<div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='title'
							render={(props) => <CoreForm.Input {...props} />}
						/>
						<FormField
							control={form.control}
							name='subtitle'
							render={(props) => <CoreForm.Input {...props} />}
						/>

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
							name='published_date'
							render={(props) => <CoreForm.DatePicker {...props} />}
						/>
						<FormField
							control={form.control}
							name='cover_image'
							render={(props) => (
								<CoreForm.FileUpload
									subLabel='Recommended Size: 1200x800'
									isUpdate={isUpdate}
									{...props}
								/>
							)}
						/>

						<FormField
							control={form.control}
							name='remarks'
							render={(props) => <CoreForm.Textarea {...props} />}
						/>
					</div>

					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='description'
							render={(props) => <CoreForm.RichTextEditor label='Summary' {...props} />}
						/>
						<FormField
							control={form.control}
							name='content'
							render={(props) => <CoreForm.RichTextEditor className='h-full' {...props} />}
						/>
					</div>
				</div>
			</CoreForm.Section>

			<CoreForm.DynamicFields
				viewAs='kanban'
				title='Image Entry (Recommended Size: 1200x800)'
				form={form}
				fieldName='entry'
				fieldDefs={useGenerateFieldDefs({
					copy: handleCopy,
					remove: handleRemove,
					isUpdate,
				})}
				handleAdd={handleAdd}
				fields={fields}
			/>
			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/portfolio/news-entry`,
						deleteData,
						onClose: () => {
							form.setValue(
								'entry',
								form.getValues('entry').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
}
