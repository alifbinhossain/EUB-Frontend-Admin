import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherVendor } from '@/lib/common-queries/other';

import { ICapital } from './config/schema';

interface IGenerateFieldDefsProps {
	data: ICapital;
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<ICapital>; // TODO: Update Schema Type
	isUpdate: boolean;
}

const useGenerateFieldDefs = ({ data, copy, remove, isUpdate, watch }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: vendorList } = useOtherVendor<IFormSelectOption[]>();
	return [
		{
			header: 'Vendor',
			accessorKey: 'vendor_uuid',
			type: 'select',
			options: vendorList || [],
			unique: true,
			excludeOptions:
				data.quotations.map((item) => item.vendor_uuid).filter((uuid): uuid is string => uuid !== undefined) ||
				[],
			disabled: watch ? !watch('is_quotation') : true,
		},
		{
			header: 'Amount',
			accessorKey: 'amount',
			type: 'number',
			disabled: watch ? !watch('is_quotation') : true,
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

export default useGenerateFieldDefs;
