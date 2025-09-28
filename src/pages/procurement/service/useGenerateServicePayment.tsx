import { addMonths, format, isBefore } from 'date-fns';
import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import DateTime from '@/components/ui/date-time';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { IService } from './config/schema';

interface IGenerateFieldDefsProps {
	data: IService;
	copy: (index: number) => void;
	remove: (index: number) => void;
	form: any;
	watch?: UseFormWatch<IService>; // TODO: Update Schema Type
	isUpdate: boolean;
	isNew: boolean;
}

const useServicePayment = ({ remove, form }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Index',
			accessorKey: 'index',
			type: 'custom',
			component: (index: number) => {
				return <span className='items-center justify-center'>{index + 1}</span>;
			},
		},
		{
			header: 'Amount',
			accessorKey: 'amount',
			type: 'number',
		},
		{
			header: 'Next Due Date',
			accessorKey: 'next_due_date',
			type: 'custom',
			component: (index: number) => {
				if (!form.watch(`end_date`) || !form.watch(`start_date`)) {
					return null;
				}
				let paymentDate = form.watch(`start_date`);
				paymentDate = paymentDate ? format(paymentDate, 'yyyy-MM-dd') : null;
				if (!paymentDate) {
					return null;
				}

				const frequency = form.watch(`frequency`);
				if (!frequency) {
					return null;
				}
				const addDueDate = addMonths(new Date(paymentDate), (12 / Number(frequency)) * (index + 1));
				const endDate = form.watch(`end_date`);
				let nextDueDate = addDueDate;

				if (isBefore(new Date(endDate), addDueDate)) {
					nextDueDate = new Date(endDate);
				} else {
					nextDueDate = new Date(addDueDate);
				}

				form.setValue(`service_payment.${index}.next_due_date`, nextDueDate);
				return <DateTime date={nextDueDate} isTime={false} />;
			},
		},
		{
			header: 'Payment Date',
			accessorKey: 'payment_date',
			type: 'date',
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				if (
					form.watch(`service_payment.${index}.amount`) &&
					form.watch(`service_payment.${index}.payment_date`)
				)
					return <FieldActionButton handleRemove={remove} index={index} />;
				return null;
			},
		},
	];
};

export default useServicePayment;
