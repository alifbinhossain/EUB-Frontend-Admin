import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherVendor } from '@/lib/common-queries/other';

import { IService } from './config/schema';

interface IGenerateFieldDefsProps {
	data: IService;
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IService>; // TODO: Update Schema Type
	isUpdate: boolean;
	isNew: boolean;
}

const useGenerateFieldDefs = ({ data, copy, remove, isUpdate, isNew }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: vendorList } = useOtherVendor<IFormSelectOption[]>();
	return [
		{
			header: 'Vendor',
			accessorKey: 'vendor_uuid',
			type: 'select',
			options: vendorList || [],
			unique: true,
			// excludeOptions: data.quotations.map((vendor) => vendor.vendor_uuid) || [],
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'number',
		},

		{
			header: 'Received',
			accessorKey: 'is_received',
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
