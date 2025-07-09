import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherRequestedItems } from '@/lib/common-queries/other';

import { IProcureRequest } from './config/schema';
import ItemSelectFilter from './item-select-filter';
import RequestQuantity from './request-quantity';
import { ICustomItemSelectOptions } from './utils';

interface IGenerateFieldDefsProps {
	remove: (index: number) => void;
	copy: (index: number) => void;
	watch: UseFormWatch<IProcureRequest>;
	set: UseFormSetValue<IProcureRequest>;
	isUpdate: boolean;
	isNew: boolean;
	data: IProcureRequest;
	form: any;
}

const useGenerateItemWorkOrder = ({ remove, watch, data, form }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: itemList } = useOtherRequestedItems<ICustomItemSelectOptions[]>();
	// const { data: itemData } = useItemByVendor<IFormSelectOption[]>(watch('vendor_uuid') as string, 'is_active=true');
	const fieldName = 'item_work_order_entry';

	return [
		{
			header: 'ID',
			accessorKey: 'index',
			type: 'custom',
			component: (index: number) => {
				return <span className='ms-4'>{index + 1}</span>;
			},
		},
		{
			header: 'Item',
			accessorKey: 'uuid',
			type: 'custom',
			component: (index: number) => {
				return (
					<ItemSelectFilter
						uuid={watch ? watch(`${fieldName}.${index}.uuid`) : undefined}
						form={form}
						index={index}
						disabled={!!data?.item_work_order_entry[index]?.uuid || data?.is_delivery_statement}
					/>
				);
			},
			minWidth: 210,
		},

		{
			header: 'Request Quantity',
			accessorKey: 'request_quantity',
			type: 'custom',
			component: (index: number) => {
				return (
					<RequestQuantity
						uuid={watch ? watch(`${fieldName}.${index}.uuid`) : ''}
						form={form}
						index={index}
						hideCopyButton={!data?.is_delivery_statement}
					/>
				);
			},
		},
		{
			header: 'Provided Quantity',
			accessorKey: 'provided_quantity',
			type: 'join-input-unit',
			inputType: 'number',
			unit: (index: number) => {
				const itemUuid = watch ? watch(`${fieldName}.${index}.uuid`) : '';
				return itemList?.find((item) => item.value === itemUuid)?.unit ?? '';
			},
			disabled: data?.is_delivery_statement,
		},
		{
			header: 'Unit Price',
			accessorKey: 'unit_price',
			type: 'number',
			disabled: data?.is_delivery_statement,
		},
		{
			header: 'Amount',
			accessorKey: 'amount',
			type: 'custom',
			component: (index: number) => {
				const providedQuantity = watch ? watch(`${fieldName}.${index}.provided_quantity`) : 0;
				const unitPrice = watch ? watch(`${fieldName}.${index}.unit_price`) : 0;

				const amount = Number(providedQuantity) * Number(unitPrice);
				return <span>{amount.toFixed(2)}</span>;
			},
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				if (data?.is_delivery_statement) {
					return <></>;
				}
				return <FieldActionButton handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateItemWorkOrder;
