import { useEffect } from 'react';
import { useSemCrsThrEntryByUUID } from '@/pages/lib/config/query';
import { BanPage } from '@/pages/public/ban';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
import { IFdeQuestion, IQuestionCategory, ISemCrsThrEntry } from '../config/types';

interface IEvaluationCategory {
	section: string;
	items: { index: number; text: string }[];
}

const Entry = () => {
	const { uuid, sem_crs_thr_entry_uuid, evaluation_time } = useParams();
	const { data: teacher_course_entry } = useSemCrsThrEntryByUUID<ISemCrsThrEntry>(sem_crs_thr_entry_uuid as string);
	const isUpdate = !!uuid;
	const navigate = useNavigate();
	const { user } = useAuth();

	const { invalidateQuery } = useFDERespondingStudent<IRespondingStudentTableData[]>();
	const { data } = useFDEFormFullResponse<any>(uuid as string);
	const { data: question, isLoading: isLoadingQuestion } = useFDEQuestion<IFdeQuestion[]>(`is_active=true`);
	const {
		data: questionCategory,
		postData,
		updateData,
		isLoading: isLoadingQuestionCategory,
	} = useFDEQuestionCategory<IQuestionCategory[]>();

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
			console.log({ data });
			form.setValue('id', data?.id);
			form.setValue('remarks', data?.remarks);
			// const modifiedQuestion = data?.evaluation?.map(
			// 	({ qns_name, rating, ...rest }: any) => ({ ...rest, name: qns_name, rating: Number(rating) }) as any
			// );

			form.setValue('qns', data.qns);
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

	if (isLoadingQuestion || isLoadingQuestionCategory) return <>Loading...</>;

	// Group questions by category
	const evaluationCategories: IEvaluationCategory[] = (questionCategory ?? []).map((category, categoryIndex) => {
		const categoryQuestions = (question ?? []).filter((q) => q.qns_category_uuid === category.uuid);
		const baseIndex = (questionCategory ?? [])
			.slice(0, categoryIndex)
			.reduce((acc, cat) => acc + (question ?? []).filter((q) => q.qns_category_uuid === cat.uuid).length, 0);

		return {
			section: category.name,
			items: categoryQuestions.map((q, questionIndex) => ({
				index: baseIndex + questionIndex,
				text: q.name,
			})),
		};
	});

	// Rating Options
	const ratingOptions = [
		{ value: 1, label: 'Excellent', range: '100-90' },
		{ value: 2, label: 'Very Good', range: '89-79' },
		{ value: 3, label: 'Good', range: '78-69' },
		{ value: 4, label: 'Satisfactory', range: '68-50' },
		{ value: 5, label: 'Not Satisfactory', range: 'Below 50' },
	];

	// Question Index
	let questionIndex = 0;

	if (
		teacher_course_entry &&
		!isUpdate &&
		evaluation_time === 'mid' &&
		teacher_course_entry?.is_mid_evaluation_complete
	) {
		return <BanPage title='Link Expired' subtitle='The Mid Evaluation is already completed' />;
	} else if (
		teacher_course_entry &&
		!isUpdate &&
		evaluation_time === 'final' &&
		(teacher_course_entry?.is_final_evaluation_complete || !teacher_course_entry?.is_mid_evaluation_complete)
	) {
		return (
			<BanPage
				title='Link Expired'
				subtitle='The Final Evaluation is already completed or Mid Evaluation is not completed'
			/>
		);
	} else {
		return (
			<div className={isUpdate ? '' : 'p-6'}>
				<CoreForm.AddEditWrapper
					title={isUpdate ? 'Edit Faculty Department Evaluation' : 'Add Faculty Department Evaluation'}
					form={form}
					onSubmit={onSubmit}
				>
					<CoreForm.Section title={`Faculty Department Evaluation`}>
						<FormField
							control={form.control}
							name='id'
							render={(props) => <CoreForm.StudentID label='Student ID' disabled={isUpdate} {...props} />}
						/>
					</CoreForm.Section>

					{/* Rating Scale */}
					<CoreForm.Section
						title={`Rating Scale`}
						className='grid w-full grid-cols-2 gap-3 md:grid-cols-5 lg:grid-cols-5'
					>
						{ratingOptions.map((option) => (
							<div key={option.value} className='bg-gradient rounded-lg border p-3 text-center'>
								<div className='text-sm font-medium'>{option.label}</div>
								<div className='mt-1 text-xs text-gray-600'>({option.range})</div>
							</div>
						))}
					</CoreForm.Section>

					<div className='overflow-x-auto rounded-md border'>
						<Table className=''>
							<TableHeader className='bg-primary text-white'>
								<TableRow className='hover:bg-transparent'>
									<TableHead className='w-1/2 text-lg font-medium text-primary-foreground'>
										Evaluation Criteria
									</TableHead>
									{ratingOptions.map((option) => (
										<TableHead
											key={option.value}
											className='min-w-[100px] text-center font-semibold text-base-200'
										>
											<div className='text-xs'>{option.label}</div>
											<div className='text-xs text-gray-300'>({option.range})</div>
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{evaluationCategories.map((category, categoryIndex) => (
									<>
										{/* Section Header */}
										<TableRow
											key={categoryIndex}
											className='bg-gradient hover:bg-gradient border-b'
										>
											<TableCell
												colSpan={6}
												className='text-base font-semibold text-base-content'
											>
												{category.section}
											</TableCell>
										</TableRow>

										{/* Section Items */}
										{category.items.map((item) => {
											const currentQuestionIndex = questionIndex++;
											return (
												<TableRow
													key={currentQuestionIndex}
													className='border-b bg-white last:border-b-0 hover:bg-white'
												>
													<TableCell className='py-4'>
														<div className='flex gap-1'>
															<span className='mt-0.5 text-sm font-medium text-gray-500'>
																{currentQuestionIndex + 1}.
															</span>
															<span className='text-sm leading-relaxed text-gray-700'>
																{item.text}
															</span>
														</div>
													</TableCell>

													{ratingOptions.map((option) => (
														<TableCell key={option.value} className='py-4 text-center'>
															<FormField
																control={form.control}
																name={`qns.${currentQuestionIndex}.rating`}
																render={({ field }) => (
																	<FormItem>
																		<FormControl>
																			<RadioGroup
																				onValueChange={(value) =>
																					field.onChange(Number(value))
																				}
																				value={field.value?.toString()}
																				className='flex justify-center'
																			>
																				<div className='flex items-center'>
																					<RadioGroupItem
																						value={option.value.toString()}
																						id={`${item.index}_${option.value}`}
																						className='size-4 border border-gray-400'
																						circleClassName='size-3'
																					/>
																					<Label
																						htmlFor={`${item.index}_${option.value}`}
																						className='sr-only'
																					>
																						{option.label}
																					</Label>
																				</div>
																			</RadioGroup>
																		</FormControl>

																		<FormMessage />
																	</FormItem>
																)}
															/>
														</TableCell>
													))}
												</TableRow>
											);
										})}
									</>
								))}
							</TableBody>
						</Table>
					</div>

					<FormField
						control={form.control}
						name='remarks'
						render={(props) => <CoreForm.Textarea {...props} />}
					/>
				</CoreForm.AddEditWrapper>
			</div>
		);
	}
};
export default Entry;
