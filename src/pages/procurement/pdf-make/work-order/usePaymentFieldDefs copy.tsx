import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { IWorkOrder } from '../config/schema';

interface IGenerateFieldDefsProps {
	remove: (index: number) => void;
	watch: UseFormWatch<IWorkOrder>;
	set: UseFormSetValue<IWorkOrder>;
	isNew: boolean;
	data: IWorkOrder;
	form: any;
}

const usePaymentFieldDefs = ({ remove, watch }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'No',
			accessorKey: 'no',
			type: 'custom',
			component: (index: number) => {
				return <span>Payment Condition {index + 1}:</span>;
			},
		},
		{
			header: 'Condition',
			accessorKey: 'condition',
			type: 'textarea',
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

export default usePaymentFieldDefs;
