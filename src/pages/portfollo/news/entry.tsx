import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherDepartments } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime, PageInfo } from '@/utils';
import Formdata from '@/utils/formdata';

import { INewsTableData } from '../_config/columns/columns.type';
import { useNews, useNewsByUUID } from '../_config/query';
import { INews, NEWS_NULL, NEWS_SCHEMA } from '../_config/schema';

export default function NewsEntry() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { uuid } = useParams();
	const isUpdate = !!uuid;

	const { data, url, imagePostData, imageUpdateData } = useNewsByUUID(uuid as string);
	const { data: departments } = useOtherDepartments<IFormSelectOption[]>();
	const { invalidateQuery } = useNews<INewsTableData[]>();

	const form = useRHF(NEWS_SCHEMA(isUpdate) as any, NEWS_NULL);

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: INews) {
		const formData = Formdata<INews>(values);

		if (isUpdate) {
			formData.append('updated_at', getDateTime());
			// UPDATE ITEM
			imageUpdateData.mutateAsync({
				url: `${url}`,
				updatedData: formData,
			});
		} else {
			formData.append('created_at', getDateTime());
			formData.append('created_by', user?.uuid || '');
			formData.append('uuid', nanoid());

			// ADD NEW ITEM
			const promise = imagePostData.mutateAsync({
				url: '/portfolio/news',
				newData: formData,
			});

			promise.then(() => {
				invalidateQuery();
				navigate('/portfolio/news');
			});
		}
	}

	const pageInfo = useMemo(
		() => new PageInfo('News Entry', '/portfolio/news/entry', 'portfolio__news_entry'),
		['/portfolio/news/entry']
	);

	useEffect(() => {
		document.title = pageInfo.title;
	});

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Edit News' : 'Add News'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section title='Information' className='flex flex-col'>
				<div className='flex w-full gap-4'>
					<FormField control={form.control} name='title' render={(props) => <CoreForm.Input {...props} />} />
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
				</div>
				<div className='flex w-full gap-4'>
					<FormField
						control={form.control}
						name='description'
						render={(props) => <CoreForm.Textarea {...props} />}
					/>
					<FormField
						control={form.control}
						name='content'
						render={(props) => <CoreForm.Textarea {...props} />}
					/>
					<FormField
						control={form.control}
						name='remarks'
						render={(props) => <CoreForm.Textarea {...props} />}
					/>
				</div>
				<div className='w-full'>
					<FormField
						control={form.control}
						name='cover_image'
						render={(props) => <CoreForm.FileUpload isUpdate={isUpdate} {...props} />}
					/>
				</div>
			</CoreForm.Section>
		</CoreForm.AddEditWrapper>
	);
}
