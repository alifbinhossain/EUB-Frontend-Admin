import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherVendor } from '@/lib/common-queries/other';

import { IItem } from './config/schema';

interface IGenerateFieldDefsProps {
	data: IItem;
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IItem>; // TODO: Update Schema Type
	isUpdate: boolean;
}

const useGenerateFieldDefs = ({ data, copy, remove }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: vendorList } = useOtherVendor<IFormSelectOption[]>();

	return [
		{
			header: 'Vendor',
			accessorKey: 'vendor_uuid',
			type: 'select',
			placeholder: 'Select Vendor',
			options: vendorList || [],
			unique: true,
			excludeOptions: data.vendors.map((vendor) => vendor.vendor_uuid) || [],
		},
		{
			header: 'Active',
			accessorKey: 'is_active',
			type: 'checkbox',
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

export default useGenerateFieldDefs;
