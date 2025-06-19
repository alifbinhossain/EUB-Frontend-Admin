import { is } from 'date-fns/locale';
import { Copy } from 'lucide-react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import { Button } from '@/components/ui/button';
import DateTime from '@/components/ui/date-time';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherRequestedItems } from '@/lib/common-queries/other';
import { getDateTime } from '@/utils';

import { IProcureRequest } from './config/schema';
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

const useGenerateItemWorkOrder = ({
	remove,
	copy,
	isUpdate,
	watch,
	set,
	data,
	form,
}: IGenerateFieldDefsProps): FieldDef[] => {
	// const { data: itemData } = useItemByVendor<IFormSelectOption[]>(watch('vendor_uuid') as string, 'is_active=true');
	const query = isUpdate ? '' : `item_work_order_uuid=null`;
	const { data: itemList } = useOtherRequestedItems<ICustomItemSelectOptions[]>(query);
	const fieldName = 'item_work_order_entry';

	const handleCopy = (index: number) => {
		const reqQuantity = form.getValues(`${fieldName}.${index}.request_quantity`);

		form.setValue(`${fieldName}.${index}.provided_quantity`, reqQuantity, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};
	return [
		{
			header: 'Item',
			accessorKey: 'item_uuid',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`${fieldName}.${index}.item_uuid`}
						render={(props) => (
							<CoreForm.ReactSelect
								disableLabel={true}
								options={itemList!}
								menuPortalTarget={document.body}
								onChange={(e: ICustomItemSelectOptions) => {
									set(`${fieldName}.${index}.item_uuid`, String(e?.value));
									set(`${fieldName}.${index}.request_quantity`, e?.request_quantity);
								}}
								placeholder='Select Item'
								isDisabled={isUpdate}
								{...props}
							/>
						)}
					/>
				);
			},
		},

		{
			header: 'Request Quantity',
			accessorKey: 'request_quantity',
			type: 'custom',
			component: (index: number) => {
				const itemUuid = watch ? watch(`${fieldName}.${index}.item_uuid`) : '';
				const unit = itemList?.find((item) => item.value === itemUuid)?.unit ?? '';
				return (
					<FormField
						control={form.control}
						name={`${fieldName}.${index}.request_quantity`}
						render={(props) => (
							<CoreForm.JoinInputUnit
								disableLabel={true}
								type='number'
								label='Request Quantity'
								disabled={true}
								unit={unit}
								{...props}
							>
								<Button
									className='rounded-full'
									onClick={() => handleCopy(index)}
									type='button'
									size={'icon'}
									variant={'ghost'}
									title='Copy to Provided Quantity'
								>
									<Copy className='size-4' />
								</Button>
							</CoreForm.JoinInputUnit>
						)}
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
				const itemUuid = watch ? watch(`${fieldName}.${index}.item_uuid`) : '';
				return itemList?.find((item) => item.value === itemUuid)?.unit ?? '';
			},
		},
		{
			header: 'Unit Price',
			accessorKey: 'unit_price',
			type: 'number',
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

export default useGenerateItemWorkOrder;
