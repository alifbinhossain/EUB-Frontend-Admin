import { Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { ITicketTableData } from './config/columns/columns.type';
import { useTicket, useTicketDetails } from './config/query';
import { ITicket, TICKET_NULL, TICKET_SCHEMA } from './config/schema';
import useGenerateTicketEntry from './useGenerateTicketEntry';
import { department } from './utils';

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();
	const { invalidateQuery: invalidateTicket } = useTicket<ITicketTableData[]>();
	const { user } = useAuth();
	const {
		data,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateTicketDetails,
	} = useTicketDetails(uuid as string);

	const { invalidateQuery } = useTicket<ITicketTableData[]>();

	const form = useRHF(TICKET_SCHEMA, TICKET_NULL);

	const {
		fields: ticketEntryFields,
		append: appendTicketEntry,
		remove: removeTicketEntry,
	} = useFieldArray({
		control: form.control,
		name: 'req_ticket_item',
	});

	const isResolved = form.watch('is_resolved');

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			// Reset form values
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: ITicket) {
		if (isUpdate) {
			// * UPDATE ITEM
			const { req_ticket_item, ...rest } = values;
			const itemUpdatedData = {
				...rest,
				updated_at: getDateTime(),
			};
			updateData
				.mutateAsync({
					url: `/procure/req-ticket/${uuid}`,
					updatedData: itemUpdatedData,
				})
				.then(() => {
					// * UPDATE FOR TICKET ENTRY
					if (req_ticket_item.length > 0) {
						const ticketEntryUpdatePromise = req_ticket_item.map((entry) => {
							if (entry.uuid) {
								const entryUpdateData = {
									...entry,
									updated_at: getDateTime(),
								};
								return updateData.mutateAsync({
									url: `/procure/req-ticket-item/${entry.uuid}`,
									updatedData: entryUpdateData,
								});
							} else {
								const entryData = {
									...entry,
									created_at: getDateTime(),
									created_by: user?.uuid,
									uuid: nanoid(),
									req_ticket_uuid: uuid,
								};
								return postData.mutateAsync({
									url: `/procure/req-ticket-item`,
									newData: entryData,
								});
							}
						});
						Promise.all([...ticketEntryUpdatePromise]);
					}
				})
				.then(() => {
					invalidateQuery();
					invalidateTicket();
					invalidateTicketDetails();
					navigate('/procurement/ticket');
				})
				.catch((error) => {
					console.error('Error updating ticket:', error);
				});
		} else {
			// ADD NEW ITEM
			const { req_ticket_item, ...rest } = values;

			const itemData = {
				...rest,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			};
			postData
				.mutateAsync({
					url: '/procure/req-ticket',
					newData: itemData,
				})
				.then(() => {
					// * ENTRY FOR TICKET ENTRY
					if (req_ticket_item.length > 0) {
						const ticketEntryPromise = req_ticket_item.map((entry) => {
							const entryData = {
								...entry,
								req_ticket_uuid: itemData.uuid,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
							};
							return postData.mutateAsync({
								url: `/procure/req-ticket-item`,
								newData: entryData,
							});
						});
						Promise.all([...ticketEntryPromise]);
					}
				})
				.then(() => {
					invalidateQuery();
					invalidateTicketDetails();
					invalidateTicket();
					navigate('/procurement/ticket');
				})
				.catch((error) => {
					console.error('Error adding ticket:', error);
				});
		}
	}

	// ? Dynamic Form
	// * ADD TICKET ENTRY
	const handleAddTicketEntry = () => {
		appendTicketEntry({
			req_ticket_uuid: undefined,
			item_uuid: '',
			quantity: 0,
		});
	};

	// * DELETE
	const [deleteItem, setDeleteItem] = useState<{
		type?: string;
		id: string;
		name: string;
	} | null>(null);

	// * REMOVE TICKET ENTRY
	const handleRemoveTicketEntry = (index: number) => {
		const ticketEntry = ticketEntryFields[index];
		if (ticketEntry.uuid) {
			setDeleteItem({
				type: 'ticket_item',
				id: ticketEntry.uuid,
				name: ticketEntry.uuid,
			});
		} else {
			removeTicketEntry(index);
		}
	};

	// * COPY TICKET ENTRY
	const handleCopyTicketEntry = (index: number) => {
		const field = form.watch('req_ticket_item')[index];
		appendTicketEntry({
			item_uuid: field.item_uuid,
			quantity: field.quantity,
			req_ticket_uuid: field.req_ticket_uuid,
		});
	};

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Update Ticket' : 'Add Ticket'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section
				title={`Ticket`}
				className='grid gap-4 lg:grid-cols-3'
				extraHeader={
					<FormField
						control={form.control}
						name='is_resolved'
						render={(props) => (
							<CoreForm.Switch label='Resolved' labelClassName='text-slate-100' {...props} />
						)}
					/>
				}
			>
				<FormField
					control={form.control}
					name='department'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Department'
							placeholder='Select department'
							menuPortalTarget={document.body}
							options={department!}
							isDisabled={isResolved}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='problem_description'
					render={(props) => (
						<CoreForm.Textarea
							label='Problem Description'
							className='col-span-2'
							disabled={isResolved}
							{...props}
						/>
					)}
				/>
			</CoreForm.Section>
			<CoreForm.DynamicFields
				title='Items'
				form={form}
				fieldName='req_ticket_item'
				handleAdd={isResolved ? undefined : handleAddTicketEntry}
				fieldDefs={useGenerateTicketEntry({
					data: form.getValues(),
					copy: handleCopyTicketEntry,
					remove: handleRemoveTicketEntry,
					watch: form.watch,
					isUpdate,
					isNew: false,
					isResolved: isResolved,
				})}
				fields={ticketEntryFields}
			/>
			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/procure/req-ticket-item`,
						deleteData,
						invalidateQuery: invalidateTicketDetails,
						onClose: () => {
							form.setValue(
								'req_ticket_item',
								form.getValues('req_ticket_item').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
