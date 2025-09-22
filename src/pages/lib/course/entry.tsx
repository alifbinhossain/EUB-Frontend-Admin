import { Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import { useOtherFinancialInfo } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { ICourseTableData } from '../config/columns/columns.type';
import { useFDECourse, useFDECourseByUUID } from '../config/query';
import { COURSE_NULL, COURSE_SCHEMA, ICourse } from '../config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';
import { courseTypeOptions, shiftTypeOptions } from './utils';

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();

	const { user } = useAuth();
	const {
		data,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateCourseSectionEntry,
	} = useFDECourseByUUID(uuid as string);

	const { invalidateQuery } = useFDECourse<ICourseTableData[]>();
	const { data: financialInfo } = useOtherFinancialInfo<IFormSelectOption[]>();

	const form = useRHF(COURSE_SCHEMA, COURSE_NULL);
	const { fields, remove, append } = useFieldArray({
		control: form.control,
		name: 'regular_section',
	});
	const {
		fields: eveningFields,
		remove: eveningRemove,
		append: eveningAppend,
	} = useFieldArray({
		control: form.control,
		name: 'evening_section',
	});

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			// Reset form values
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);
	useEffect(() => {
		const shiftType = form.watch('shift_type');

		if (shiftType === 'regular') {
			form.setValue('evening_section', []);
		} else if (shiftType === 'evening') {
			form.setValue('regular_section', []);
		}
	}, [form.watch('shift_type')]);

	// Submit handler
	async function onSubmit(values: ICourse) {
		const { regular_section, evening_section, ...rest } = values;
		const course_section = regular_section?.concat(evening_section || []) || [];

		if (isUpdate) {
			// UPDATE ITEM
			const courseUpdateData = {
				...rest,
				updated_at: getDateTime(),
			};

			updateData
				.mutateAsync({
					url: `/lib/course/${uuid}`,
					updatedData: courseUpdateData,
				})
				.then(() => {
					const entryUpdatePromise = course_section.map((entry, index) => {
						if (entry.uuid) {
							return updateData.mutateAsync({
								url: `/lib/course-section/${entry.uuid}`,
								updatedData: entry,
							});
						} else {
							const entryData = {
								...entry,
								index: index,
								course_uuid: uuid,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
							};

							return postData.mutateAsync({
								url: `/lib/course-section`,
								newData: entryData,
							});
						}
					});

					return Promise.all([...entryUpdatePromise]); // Wait for all entry updates to complete
				})
				.then(() => {
					invalidateQuery(); // Invalidate queries after all updates are done
					invalidateCourseSectionEntry();
					navigate('/lib/course');
				})
				.catch((error) => {
					console.error('Error updating:', error);
				});
		} else {
			// ADD NEW ITEM

			const courseData = {
				...rest,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			};

			if (course_section.length === 0) {
				toast.warning('please add at least one entry');
				return;
			}

			postData
				.mutateAsync({
					url: '/lib/course',
					newData: courseData,
				})
				.then(() => {
					const entryPromise = course_section.map((entry, index) => {
						const entryData = {
							...entry,
							index: index,
							course_uuid: courseData.uuid,
							created_at: getDateTime(),
							created_by: user?.uuid,
							uuid: nanoid(),
						};

						return postData.mutateAsync({
							url: `/lib/course-section`,
							newData: entryData,
						});
					});

					Promise.all([...entryPromise]);
				})
				.then(() => {
					invalidateQuery();
					invalidateCourseSectionEntry();
					navigate('/lib/course');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}

	const handleAdd = () => {
		append({
			uuid: '',
			course_uuid: '',
			name: '',
			type: 'regular',
		});
	};
	const handleEveningAdd = () => {
		eveningAppend({
			uuid: '',
			course_uuid: '',
			name: '',
			type: 'evening',
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
				name: fields[index].name,
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		const field = form.watch('regular_section')[index] || {};
		append({
			uuid: '',
			course_uuid: '',
			name: field.name,
			type: 'regular',
		});
	};
	const handleEveningRemove = (index: number) => {
		if (eveningFields[index].uuid) {
			setDeleteItem({
				id: eveningFields[index].uuid,
				name: eveningFields[index].name,
			});
		} else {
			eveningRemove(index);
		}
	};

	// Copy Handler
	const handleEveningCopy = (index: number) => {
		const field = form.watch('evening_section')[index];
		append({
			uuid: '',
			course_uuid: '',
			name: field.name,
			type: 'evening',
		});
	};
	const fieldDefsRegular = useGenerateFieldDefs({
		watch: form.watch,
		set: form.setValue,
		remove: handleRemove,
		copy: handleCopy,
		isUpdate,
		isNew: false,
		data: form.getValues(),
		form: form,
	});
	const fieldDefsEvening = useGenerateFieldDefs({
		watch: form.watch,
		set: form.setValue,
		remove: handleEveningRemove,
		copy: handleEveningCopy,
		isUpdate,
		isNew: false,
		data: form.getValues(),
		form: form,
	});

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Edit Course' : 'Add Course'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section title={`Course`}>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='code' render={(props) => <CoreForm.Input {...props} />} />
				<FormField
					control={form.control}
					name='credit'
					render={(props) => <CoreForm.Input type='number' {...props} />}
				/>
				<FormField
					control={form.control}
					name='financial_info_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Department'
							menuPortalTarget={document.body}
							options={financialInfo!}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='course_type'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Course Type'
							menuPortalTarget={document.body}
							options={courseTypeOptions!}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='shift_type'
					render={(props) => (
						<CoreForm.ReactSelect menuPortalTarget={document.body} options={shiftTypeOptions} {...props} />
					)}
				/>
			</CoreForm.Section>

			{(form.watch('shift_type') === 'regular' || form.watch('shift_type') === 'regular_and_evening') && (
				<CoreForm.DynamicFields
					title='Regular'
					form={form}
					fieldName='regular_section'
					fieldDefs={fieldDefsRegular}
					fields={fields}
					handleAdd={handleAdd}
				/>
			)}
			{(form.watch('shift_type') === 'evening' || form.watch('shift_type') === 'regular_and_evening') && (
				<CoreForm.DynamicFields
					title='Evening'
					form={form}
					fieldName='evening_section'
					fieldDefs={fieldDefsEvening}
					fields={eveningFields}
					handleAdd={handleEveningAdd}
				/>
			)}

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/lib/course-section`,
						deleteData,
						invalidateQuery: invalidateCourseSectionEntry,
						invalidateQueries: [invalidateQuery, invalidateCourseSectionEntry],
						onClose: () => {
							form.setValue(
								'regular_section',
								form.getValues('regular_section').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
