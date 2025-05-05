import { addMonths, format } from 'date-fns';
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

const useServicePayment = ({ data, copy, remove, isUpdate, isNew, form }: IGenerateFieldDefsProps): FieldDef[] => {
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
				let paymentDate = form.watch(`start_date`);
				paymentDate = paymentDate ? format(paymentDate, 'yyyy-MM-dd') : null;
				if (!paymentDate) {
					return null;
				}
				const frequency = form.watch(`frequency`);
				const nextDueDate = addMonths(new Date(paymentDate), Number(frequency) * (index + 1));
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
				return <FieldActionButton handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useServicePayment;
