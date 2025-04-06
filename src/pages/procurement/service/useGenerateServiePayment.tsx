import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { IService } from './config/schema';

interface IGenerateFieldDefsProps {
	data: IService;
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IService>; // TODO: Update Schema Type
	isUpdate: boolean;
	isNew: boolean;
}

const useServicePayment = ({ data, copy, remove, isUpdate, isNew }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Amount',
			accessorKey: 'amount',
			type: 'number',
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
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useServicePayment;
