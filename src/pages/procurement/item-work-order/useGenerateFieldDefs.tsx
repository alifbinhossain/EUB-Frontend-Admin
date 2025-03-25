import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useItemByVendor } from './config/query';
import { IItemWorkOrder } from './config/schema';

interface IGenerateFieldDefsProps {
	remove: (index: number) => void;
	copy: (index: number) => void;
	watch: UseFormWatch<IItemWorkOrder>;
	set: UseFormSetValue<IItemWorkOrder>;
	isUpdate: boolean;
	isNew: boolean;
	data: IItemWorkOrder;
}

const useGenerateFieldDefs = ({
	remove,
	copy,
	isUpdate,
	isNew,
	watch,
	set,
	data,
}: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: itemData } = useItemByVendor<IFormSelectOption[]>(watch('vendor_uuid') as string);

	return [
		{
			header: 'Item',
			accessorKey: 'item_uuid',
			type: 'select',
			options: itemData || [],
			unique: true,
			excludeOptions: data.item_work_order_entry.map((item) => item.item_uuid) || [],
			onChange(option, field) {
				const index = field.name.split('.')[1];
				set(`item_work_order_entry.${index}.unit_price`, option?.unit_price);
			},
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'number',
		},
		{
			header: 'Unit Price',
			accessorKey: 'unit_price',
			type: 'number',
			disabled: true,
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
