import { useEffect } from 'react';
import { useSemCrsThrEntryByUUID } from '@/pages/lib/config/query';
import { BanPage } from '@/pages/public/ban';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { cn } from '@/lib/utils';
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

	useEffect(() => {
		if (!isUpdate && question) {
			// Reset form values
			const modifiedQuestion = question?.map(({ uuid, ...rest }) => ({ ...rest, qns_uuid: uuid }) as any);
			form.reset({ qns: modifiedQuestion });
		} else if (isUpdate && data) {
			form.reset({
				id: data?.id,
				remarks: data?.remarks,
				qns: data.qns,
			});
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
					const entryUpdatePromise = qns.map((entry) => {
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
					const entryPromise = qns.map((entry) => {
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

	// Helper function to get question index
	const getQuestionIndex = (categoryIndex: number, itemIndex: number) => {
		let index = 0;
		for (let i = 0; i < categoryIndex; i++) {
			index += evaluationCategories[i].items.length;
		}
		return index + itemIndex;
	};

	// Helper function to check if category is completed
	const isCategoryCompleted = (categoryIndex: number) => {
		const startIndex = getQuestionIndex(categoryIndex, 0);
		const endIndex = startIndex + evaluationCategories[categoryIndex].items.length;

		for (let i = startIndex; i < endIndex; i++) {
			const fieldValue = form.watch(`qns.${i}.rating`);
			if (!fieldValue || fieldValue === 0) {
				return false;
			}
		}
		return true;
	};

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
			<div className={isUpdate ? '' : 'p-4 md:p-6'}>
				<CoreForm.AddEditWrapper
					title={isUpdate ? 'Edit Faculty Department Evaluation' : 'Add Faculty Department Evaluation'}
					form={form}
					onSubmit={onSubmit}
				>
					<div className='mx-auto max-w-fit'>
						<FormField
							control={form.control}
							name='id'
							render={(props) => (
								<CoreForm.StudentID
									labelClassName='justify-center'
									label='Student ID'
									disabled={isUpdate}
									{...props}
								/>
							)}
						/>
					</div>
					{/* Rating Scale */}
					<CoreForm.Section title={`Rating Scale`} className='block w-full p-2'>
						{/* Desktop Rating Scale */}
						<div className='hidden grid-cols-5 gap-3 md:grid'>
							{ratingOptions.map((option) => (
								<div key={option.value} className='bg-gradient rounded-lg border p-3 text-center'>
									<div className='text-sm font-medium'>{option.label}</div>
									<div className='mt-1 text-xs text-gray-600'>({option.range})</div>
								</div>
							))}
						</div>

						{/* Mobile Rating Scale */}
						<div className='space-y-2 md:hidden'>
							{ratingOptions.map((option) => (
								<div
									key={option.value}
									className='bg-gradient flex items-center justify-between rounded-lg border p-2'
								>
									<div className='text-sm font-medium'>{option.label}</div>
									<div className='text-xs text-gray-600'>({option.range})</div>
								</div>
							))}
						</div>
					</CoreForm.Section>

					{/* Desktop Table View */}
					<div className='hidden overflow-x-auto rounded-md border md:block'>
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
																				value={
																					form
																						.watch(
																							`qns.${currentQuestionIndex}.rating`
																						)
																						?.toString() ?? ''
																				}
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

					{/* Mobile Card View */}
					<div className='md:hidden'>
						<h3 className='mb-2 text-base font-semibold text-gray-900'>Performance Evaluation</h3>
						<Accordion type='multiple' className='space-y-2'>
							{evaluationCategories.map((category, categoryIndex) => {
								const isCompleted = isCategoryCompleted(categoryIndex);
								const completedCount = category.items.filter((_, itemIndex) => {
									const questionIndex = getQuestionIndex(categoryIndex, itemIndex);
									const fieldValue = form.watch(`qns.${questionIndex}.rating`);
									return fieldValue && fieldValue !== 0;
								}).length;

								return (
									<AccordionItem
										key={categoryIndex}
										value={'category-' + categoryIndex}
										className='rounded-lg border'
									>
										<AccordionTrigger className='px-4 py-3 hover:no-underline'>
											<div className='mr-2 flex w-full items-center justify-between'>
												<span className='text-left text-sm font-medium'>
													{category.section}
												</span>
												<div className='flex items-center gap-2'>
													<span className='text-xs text-gray-500'>
														{completedCount}/{category.items.length}
													</span>
													<div
														className={cn(
															'size-2 rounded-full',
															isCompleted ? 'bg-success' : 'bg-warning'
														)}
													/>
												</div>
											</div>
										</AccordionTrigger>
										<AccordionContent className='px-2 pb-4'>
											<div className='space-y-2'>
												{category.items.map((item, itemIndex) => {
													const questionIndex = getQuestionIndex(categoryIndex, itemIndex);
													return (
														<Card key={questionIndex} className='border border-gray-200'>
															<CardContent className='space-y-3 p-3'>
																{/* Question */}
																<div className='flex gap-0.5'>
																	<span className='mt-0.5 flex-shrink-0 text-sm font-medium text-foreground'>
																		{questionIndex + 1}.
																	</span>
																	<p className='text-sm leading-relaxed text-foreground'>
																		{item.text}
																	</p>
																</div>
																{/* Rating Options */}
																<FormField
																	control={form.control}
																	name={`qns.${questionIndex}.rating`}
																	render={({ field }) => (
																		<FormItem>
																			<FormControl>
																				<RadioGroup
																					onValueChange={(value) =>
																						field.onChange(Number(value))
																					}
																					value={field.value?.toString()}
																					className='grid grid-cols-1 gap-2'
																				>
																					{ratingOptions.map((option) => (
																						<div
																							key={option.value}
																							className='flex items-center space-x-3 rounded-lg border border-gray-200 p-2 hover:bg-gray-50'
																						>
																							<RadioGroupItem
																								value={option.value.toString()}
																								id={`mobile_${questionIndex}_${option.value}`}
																								className='h-4 w-4'
																							/>
																							<Label
																								htmlFor={`mobile_${questionIndex}_${option.value}`}
																								className='flex flex-1 cursor-pointer items-center justify-between text-sm'
																							>
																								<span className='font-medium'>
																									{option.label}
																								</span>
																								<span className='text-xs text-gray-500'>
																									({option.range})
																								</span>
																							</Label>
																						</div>
																					))}
																				</RadioGroup>
																			</FormControl>
																			<FormMessage />
																		</FormItem>
																	)}
																/>
															</CardContent>
														</Card>
													);
												})}
											</div>
										</AccordionContent>
									</AccordionItem>
								);
							})}
						</Accordion>
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
