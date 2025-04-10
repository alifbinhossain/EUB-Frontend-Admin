import React, { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';

import FieldActionButton from '@/components/buttons/field-action';
import StatusButton from '@/components/buttons/status';
import { RichTextModal } from '@/components/core/modal';
import DateTime from '@/components/ui/date-time';

import { ICard } from '../types';

const column = 'sections';
export const Card = ({
	setIsUpdateModal,
	handleDragStart,
	handleDeleteCard,
	setOpen,
	index,
	fieldDefs,
	updateData,
	setUpdatedData,
}: {
	index: number;
	handleDragStart?: (e: React.DragEvent<HTMLDivElement>, card: ICard) => void;
	handleDeleteCard: (uuid: string) => void;
	setIsUpdateModal: any;
	setOpen: any;
	open: any;
	setUpdatedData: any;
} & { form: any } & { fieldDefs: any } & { updateData: any; defaultCard: any } & {
	isEditing: any;
	setEditing: any;
}) => {
	const [data, setData] = useState(updateData);

	useEffect(() => {
		setData(updateData);
	}, [updateData]);
	const handleUpdate = () => {
		setUpdatedData(updateData);
		setIsUpdateModal(true);
		setOpen(true);
	};

	return (
		<>
			<div
				data-before={updateData.uuid || '-1'}
				data-column={column}
				className='my-0.5 h-0.5 w-full bg-violet-400 opacity-0'
			/>
			<m.div
				layout
				layoutId={updateData.uuid}
				draggable='true'
				onDragStart={(e: any) => handleDragStart!(e, data)}
				className='cursor-grab rounded border border-neutral-700 bg-secondary/10 p-1 active:cursor-grabbing'
			>
				<div className='flex gap-2'>
					<div className='text-sm'>#{(index ?? 0) + 1}</div>
					<div className='grid flex-1 grid-cols-8 gap-x-2'>
						{fieldDefs
							.filter((fieldDef: any) => !fieldDef.hidden)
							.map((fieldDef: any) => {
								if (fieldDef.view === 'status') {
									return (
										<div className='flex items-center justify-center p-2'>
											<div>
												<StatusButton value={data[fieldDef.accessorKey] as boolean} />
											</div>
										</div>
									);
								} else if (fieldDef.view === 'preview') {
									return (
										<RichTextModal
											title={fieldDef.title}
											content={data[fieldDef.accessorKey as keyof typeof data]}
										/>
									);
								} else if (fieldDef.view === 'Date') {
									return (
										<div className='flex items-center justify-center bg-primary-foreground p-2'>
											<DateTime isTime={false} date={data[fieldDef.accessorKey] as Date} />
										</div>
									);
								} else if (fieldDef.type === 'select') {
									const selectedOption = fieldDef.options.find(
										(option: any) =>
											option.value === data[fieldDef.accessorKey as keyof typeof data]
									);
									return (
										<div className='bg-primary-foreground p-2'>
											<p key={fieldDef.accessorKey}>{selectedOption?.label}</p>
										</div>
									);
								} else {
									return (
										<div className='bg-primary-foreground p-2'>
											<p className='' key={fieldDef.accessorKey}>
												{data[fieldDef.accessorKey as keyof typeof data]}
											</p>
										</div>
									);
								}
							})}
					</div>
					<div className='align flex gap-2 bg-primary-foreground'>
						<FieldActionButton
							handleEdit={() => handleUpdate()}
							handleRemove={() => handleDeleteCard(data.uuid!)}
							index={data.index!}
						/>
					</div>
				</div>
			</m.div>
		</>
	);
};
