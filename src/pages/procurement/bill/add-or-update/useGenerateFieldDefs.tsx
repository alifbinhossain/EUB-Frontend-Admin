import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import DateTime from '@/components/ui/date-time';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { getDateTime } from '@/utils';

import { IBill } from '../config/schema';
import { types } from '../utills';

interface IGenerateFieldDefsProps {
	copy: (index: any) => void;
	remove: (index: any) => void;
	watch?: UseFormWatch<IBill>;
	form: any;
	data: any;
}

const useGenerateFieldDefs = ({ copy, remove, watch, data }: IGenerateFieldDefsProps): FieldDef[] => {
	const isComplete = data?.is_completed || false;
	return [
		{
			header: 'Type',
			accessorKey: 'type',
			type: 'select',
			placeholder: 'Select type',
			options: types || [],
			disabled: isComplete,
		},
		{
			header: 'Amount',
			accessorKey: 'amount',
			type: 'number',
			disabled: isComplete,
		},
		{
			header: 'Payment Method',
			accessorKey: 'payment_method',
			type: 'select',
			disabled: isComplete,
			options: [
				{ label: 'Cash', value: 'cash' },
				{ label: 'Cheque', value: 'cheque' },
			],
		},
		{
			header: 'Date',
			accessorKey: 'payment_date',
			type: 'date',
			disabled: isComplete,
		},
		// {
		// 	header: 'Date',
		// 	accessorKey: 'payment_date',
		// 	type: 'custom',
		// 	component: (index: number) => {
		// 		const paymentDate = watch?.(`bill_payment.${index}.payment_date`);
		// 		let dateValue: Date | null | undefined = undefined;
		// 		if (typeof paymentDate === 'string' && paymentDate) {
		// 			dateValue = new Date(paymentDate);
		// 		} else if (paymentDate && (paymentDate as unknown) instanceof Date) {
		// 			dateValue = (paymentDate as unknown as Date) || null;
		// 		} else {
		// 			dateValue = new Date(getDateTime());
		// 		}
		// 		return <DateTime date={dateValue} isTime={false} />;
		// 	},
		// },
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'textarea',
			disabled: isComplete,
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} hidden={isComplete} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
