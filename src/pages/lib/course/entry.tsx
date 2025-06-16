import { Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { ICourseTableData } from '../config/columns/columns.type';
import { useFDECourse, useFDECourseByUUID } from '../config/query';
import { COURSE_NULL, COURSE_SCHEMA, ICourse } from '../config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';

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

	const form = useRHF(COURSE_SCHEMA, COURSE_NULL);
	const { fields, remove, append } = useFieldArray({
		control: form.control,
		name: 'course_section',
	});

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			// Reset form values
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: ICourse) {
		const { course_section, ...rest } = values;

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
					const entryUpdatePromise = course_section.map((entry) => {
						if (entry.uuid) {
							return updateData.mutateAsync({
								url: `/lib/course-section/${entry.uuid}`,
								updatedData: entry,
							});
						} else {
							const entryData = {
								...entry,
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
					const entryPromise = course_section.map((entry) => {
						const entryData = {
							...entry,
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
		const field = form.watch('course_section')[index];
		append({
			uuid: '',
			course_uuid: '',
			name: field.name,
		});
	};

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Edit Course' : 'Add Course'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section title={`Course Section`}>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='code' render={(props) => <CoreForm.Input {...props} />} />
			</CoreForm.Section>

			<CoreForm.DynamicFields
				title='Course Semester Entry'
				form={form}
				fieldName='course_section'
				fieldDefs={useGenerateFieldDefs({
					watch: form.watch,
					set: form.setValue,
					remove: handleRemove,
					copy: handleCopy,
					isUpdate,
					isNew: false,
					data: form.getValues(),
					form: form,
				})}
				fields={fields}
				handleAdd={handleAdd}
			/>

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
								'course_section',
								form.getValues('course_section').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
