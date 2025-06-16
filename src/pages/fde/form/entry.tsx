import { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IRespondingStudentTableData } from '../../fde/config/columns/columns.type';
import {
	useFDEFormFullResponse,
	useFDEQuestion,
	useFDEQuestionCategory,
	useFDERespondingStudent,
} from '../../fde/config/query';
import { FORM_NULL, FORM_SCHEMA, IForm } from '../../fde/config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const Entry = () => {
	const { uuid, sem_crs_thr_entry_uuid, evaluation_time } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();

	const { user } = useAuth();

	const { invalidateQuery } = useFDERespondingStudent<IRespondingStudentTableData[]>();
	const { data } = useFDEFormFullResponse<any>(uuid as string);
	const { data: question } = useFDEQuestion<any[]>();
	const { data: questionCategory, postData, updateData } = useFDEQuestionCategory<any[]>();

	const form = useRHF(FORM_SCHEMA, FORM_NULL);

	const { fields } = useFieldArray({
		control: form.control,
		name: 'qns',
	});
	useEffect(() => {
		if (!isUpdate && question) {
			// Reset form values
			const modifiedQuestion = question?.map(({ uuid, ...rest }) => ({ ...rest, qns_uuid: uuid }) as any);

			form.setValue('qns', modifiedQuestion);
		} else if (isUpdate && data) {
			form.setValue('id', data?.id);
			form.setValue('remarks', data?.remarks);
			const modifiedQuestion = data?.evaluation?.map(
				({ qns_name, rating, ...rest }: any) => ({ ...rest, name: qns_name, rating: Number(rating) }) as any
			);

			form.setValue('qns', modifiedQuestion);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUpdate, question, data]);

	// Submit handler
	async function onSubmit(values: IForm) {
		if (isUpdate) {
			// UPDATE ITEM
			const { qns, ...rest } = values;
			const itemUpdatedData = {
				...rest,
				evaluation_time: evaluation_time,
				sem_crs_thr_entry_uuid: sem_crs_thr_entry_uuid,
				updated_at: getDateTime(),
			};

			updateData
				.mutateAsync({
					url: `/fde/respond-student/${uuid}`,
					updatedData: itemUpdatedData,
				})
				.then(() => {
					const entryUpdatePromise = qns.map((entry, index) => {
						if (entry.uuid) {
							const entryUpdateData = {
								...entry,
								rating: Number(entry.rating),
								respond_student_uuid: uuid,
								updateDate: getDateTime(),
							};
							return updateData.mutateAsync({
								url: `/fde/evaluation/${entry.uuid}`,
								updatedData: entryUpdateData,
							});
						} else {
							const entryData = {
								...entry,
								rating: Number(entry.rating),
								respond_student_uuid: uuid,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
							};

							return postData.mutateAsync({
								url: `/fde/evaluation`,
								newData: entryData,
							});
						}
					});

					return Promise.all([...entryUpdatePromise]); // Wait for all entry updates to complete
				})
				.then(() => {
					invalidateQuery();
					navigate('/fde/form');
				})
				.catch((error) => {
					console.error('Error updating news:', error);
				});
		} else {
			// ADD NEW ITEM
			const { qns, ...rest } = values;
			const new_uuid = nanoid();
			const itemData = {
				...rest,
				evaluation_time: evaluation_time,
				sem_crs_thr_entry_uuid: sem_crs_thr_entry_uuid,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: new_uuid,
			};

			postData
				.mutateAsync({
					url: '/fde/respond-student',
					newData: itemData,
				})
				.then(() => {
					const entryPromise = qns.map((entry, index) => {
						const entryData = {
							...entry,
							rating: Number(entry.rating),
							respond_student_uuid: new_uuid,
							created_at: getDateTime(),
							created_by: user?.uuid,
							uuid: nanoid(),
						};

						return postData.mutateAsync({
							url: `/fde/evaluation`,
							newData: entryData,
						});
					});

					Promise.all([...entryPromise]);
				})
				.then(() => {
					invalidateQuery();
					navigate('/success');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}

	const fliedDefs = useGenerateFieldDefs({
		watch: form.watch,
		set: form.setValue,
		isUpdate,
		isNew: false,
		data: form.getValues(),
		form: form,
	});
	let startIndex: number;
	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Faculty Department Evaluation' : 'Add Faculty Department Evaluation'}
			form={form}
			onSubmit={onSubmit}
		>
			<CoreForm.Section title={`Faculty Department Evaluation`}>
				<FormField
					control={form.control}
					name='id'
					render={(props) => <CoreForm.Input label='Student ID' disabled={isUpdate} {...props} />}
				/>
			</CoreForm.Section>

			{questionCategory?.map((category, index) => {
				startIndex =
					index == 0
						? 0
						: startIndex +
							fields.filter((item) => item?.qns_category_uuid === questionCategory[index - 1].uuid)
								.length;
				return (
					<CoreForm.DynamicFields
						title={category?.name}
						form={form}
						fieldName='qns'
						fieldDefs={fliedDefs}
						startIndex={startIndex}
						fields={fields.filter((item) => item?.qns_category_uuid === category?.uuid)}
					/>
				);
			})}
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
