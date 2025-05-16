import { useEffect, useMemo } from 'react';
import { TableProvider } from '@/context';
import { addMonths, differenceInMonths, format, isBefore } from 'date-fns';

import { servicePaymentColumns } from '../config/columns';
import { IServiceTableData } from '../config/columns/columns.type';

const Table: React.FC<{ data: IServiceTableData; isLoading: boolean }> = ({ data, isLoading }) => {
	const servicePayments = useMemo(() => {
		if (!data) return;

		const startDate = data.start_date;
		const endDate = data.end_date;
		const duration = differenceInMonths(endDate || new Date(), startDate || new Date());

		const currentFrequency = data.frequency;

		const arraySize = Math.ceil((duration ?? 0) / (12 / Number(currentFrequency)));

		const newServicePayments = [];

		for (let index = 0; index < arraySize; index++) {
			if (!startDate) {
				return;
			}
			const frequency = Number(data?.frequency);
			if (!frequency || isNaN(frequency)) {
				continue;
			}

			const addDueDate = addMonths(startDate, (12 / Number(frequency)) * (index + 1));

			let nextDueDate: Date | string;
			if (endDate && isBefore(endDate, addDueDate)) {
				nextDueDate = endDate;
			} else {
				nextDueDate = addDueDate;
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
