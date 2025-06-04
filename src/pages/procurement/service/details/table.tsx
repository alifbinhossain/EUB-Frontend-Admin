import { start } from 'repl';
import { useEffect, useMemo } from 'react';
import { TableProvider } from '@/context';
import { addMonths, differenceInMonths, format, isBefore } from 'date-fns';

import { servicePaymentColumns } from '../config/columns';
import { IServiceTableData } from '../config/columns/columns.type';

const Table: React.FC<{ data: IServiceTableData; isLoading: boolean }> = ({ data, isLoading }) => {
	let arraySize = 0;
	const servicePayments = useMemo(() => {
		if (!data) return;

		const startDate = new Date(data.start_date);
		const endDate = new Date(data.end_date);
		const duration = differenceInMonths(endDate || new Date(), startDate || new Date());

		const currentFrequency = data.frequency;

		if (
			(startDate?.getDate() !== endDate?.getDate() &&
				Math.ceil(((duration ?? 0) + 1) % (12 / Number(currentFrequency))) === 0) ||
			duration === 0
		) {
			arraySize = Math.ceil(((duration ?? 0) + 1) / (12 / Number(currentFrequency)));
		} else {
			arraySize = Math.ceil((duration ?? 0) / (12 / Number(currentFrequency)));
		}

		const newServicePayments = [];

		for (let index = 0; index < arraySize; index++) {
			let paymentDate = data?.start_date;
			paymentDate = format(paymentDate, 'yyyy-MM-dd');

			const frequency = data.frequency;

			const addDueDate = addMonths(new Date(paymentDate), (12 / Number(frequency)) * (index + 1));
			const endDate = data?.end_date;
			let nextDueDate = addDueDate;

			if (isBefore(new Date(endDate), addDueDate)) {
				nextDueDate = new Date(endDate);
			} else {
				nextDueDate = new Date(addDueDate);
			}

			newServicePayments.push({
				payment_date: data?.service_payment && data.service_payment[index]?.payment_date,
				amount: data?.service_payment && data.service_payment[index] ? data.service_payment[index].amount : 0,
				next_due_date: nextDueDate,
				remarks: data?.service_payment && data.service_payment[index]?.remarks,
			});
		}
		return newServicePayments;
	}, [data]);
	const columns = servicePaymentColumns();

	return (
		<div className='flex flex-col gap-4'>
			<TableProvider title={'Service Payment'} columns={columns} data={servicePayments!} isLoading={isLoading} />
		</div>
	);
};

export default Table;
