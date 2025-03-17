import { motion as m } from 'framer-motion';
import { FormProvider } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import CoreForm from '@core/form';

export const AddCard = ({
	handleSaveAll,
	form,
	fieldDefs,
	defaultCard,
	onSubmit,
	adding,
	setAdding,
	isEditing,
	setEditing,
}: any & { handleSaveAll: () => void } & { form: any } & { fieldDefs: any } & {
	newCard: any;
	defaultCard: any;
} & { onSubmit: any }) => {
	const handleCloseForm = () => {
		setAdding(false);
		form.reset(defaultCard);
	};

	return adding && isEditing === -1 ? (
		<FormProvider {...form}>
			<div className='rounded border border-neutral-700 bg-secondary/10 p-3'>
				<m.form layout onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2'>
					{fieldDefs
						.filter((fieldDef: any) => !fieldDef.hidden)
						.map((fieldDef: any) => {
							if (fieldDef.isLoading) {
								return <Skeleton className='h-8 w-full bg-secondary/10' />;
							} else {
								return (
									<div className='flex-1'>
										{fieldDef.type === 'text' && (
											<FormField
												control={form.control}
												name={`${fieldDef.accessorKey}`}
												render={(props) => (
													<CoreForm.Input
														type={'text'}
														disableLabel
														placeholder={fieldDef.placeholder}
														{...props}
													/>
												)}
											/>
										)}

										{fieldDef.type === 'number' && (
											<FormField
												control={form.control}
												name={`${fieldDef.accessorKey}`}
												render={(props) => (
													<CoreForm.Input
														type='number'
														disableLabel
														placeholder={fieldDef.placeholder}
														{...props}
													/>
												)}
											/>
										)}
										{fieldDef.type === 'textarea' && (
											<FormField
												control={form.control}
												name={`${fieldDef.accessorKey}`}
												render={(props) => (
													<CoreForm.Textarea
														disableLabel
														placeholder={fieldDef.placeholder}
														{...props}
													/>
												)}
											/>
										)}

										{fieldDef.type === 'select' && (
											<FormField
												control={form.control}
												name={`${fieldDef.accessorKey}`}
												render={(props) => (
													<CoreForm.ReactSelect
														menuPortalTarget={document.body}
														options={fieldDef.options}
														placeholder={fieldDef.placeholder}
														disableLabel
														{...props}
													/>
												)}
											/>
										)}
									</div>
								);
							}
						})}
					<div className='mt-1.5 flex items-center justify-end gap-1.5'>
						<button
							onClick={handleCloseForm}
							type='button'
							className='flex items-center gap-1.5 rounded bg-red-500 px-3 py-1.5 text-xs text-neutral-50 transition-colors hover:bg-red-600'
						>
							<span>Cancel</span>
						</button>
						<button
							type='submit'
							className='flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs text-neutral-50 transition-colors hover:bg-neutral-600'
						>
							<span>Save</span>
						</button>
					</div>
				</m.form>
			</div>
		</FormProvider>
	) : isEditing === -1 ? (
		<div className='flex gap-2'>
			<m.button
				layout
				onClick={handleSaveAll}
				className='transition-color flex h-9 w-full items-center justify-center gap-1.5 bg-primary px-3 py-1.5 text-xs text-neutral-50'
			>
				<span>Save</span>
			</m.button>
		</div>
	) : (
		<div></div>
	);
};
