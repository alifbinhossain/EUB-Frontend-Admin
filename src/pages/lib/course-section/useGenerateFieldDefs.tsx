import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import DateTime from '@/components/ui/date-time';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { getDateTime } from '@/utils';

import { useItemByVendor } from '../../fde/config/query';
import { IItemWorkOrder } from '../../fde/config/schema';

interface IGenerateFieldDefsProps {
	remove: (index: number) => void;
	copy: (index: number) => void;
	watch: UseFormWatch<IItemWorkOrder>;
	set: UseFormSetValue<IItemWorkOrder>;
	isUpdate: boolean;
	isNew: boolean;
	data: IItemWorkOrder;
	form: any;
}

const useGenerateFieldDefs = ({
	remove,
	copy,
	isUpdate,
	isNew,
	watch,
	set,
	data,
	form,
}: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: itemData } = useItemByVendor<IFormSelectOption[]>(watch('vendor_uuid') as string, 'is_active=true');

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
			type: 'join-input-unit',
			inputType: 'number',
			unit: (index: number) =>
				itemData?.find((item) => item.value === watch(`item_work_order_entry.${index}.item_uuid`))?.unit ?? '',
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
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`item_work_order_entry.${index}.is_received`}
						render={(props) => (
							<CoreForm.Checkbox
								label='Received'
								onCheckedChange={() => {
									if (!watch(`item_work_order_entry.${index}.is_received`)) {
										set(`item_work_order_entry.${index}.is_received`, true, {
											shouldDirty: true,
										});
										set(`item_work_order_entry.${index}.received_date`, getDateTime());
									} else {
										set(`item_work_order_entry.${index}.is_received`, false, {
											shouldDirty: true,
										});
										set(`item_work_order_entry.${index}.received_date`, null);
									}
								}}
								{...props}
							/>
						)}
					/>
				);
			},
		},
		{
			header: 'Received Date',
			accessorKey: 'received_date',
			type: 'custom',
			component: (index: number) => {
				return (
					<DateTime
						date={
							watch(`item_work_order_entry.${index}.received_date`)
								? new Date(watch(`item_work_order_entry.${index}.received_date`) as string)
								: null
						}
						isTime={false}
					/>
				);
			},
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
