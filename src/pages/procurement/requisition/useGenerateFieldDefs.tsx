import { Copy } from 'lucide-react';
import { UseFormWatch } from 'react-hook-form';
import useAccess from '@/hooks/useAccess';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherItem } from '@/lib/common-queries/other';

import { IRequisition } from './config/schema';

interface IGenerateFieldDefsProps {
	data: IRequisition;
	remove: (index: number) => void;
	watch?: UseFormWatch<IRequisition>; // TODO: Update Schema Type
	isUpdate: boolean;
	request?: boolean;
	provider?: boolean;
	form: any;
	isNew?: boolean;
}

const getAccess = (pageAccess: string[]) => {
	if (pageAccess.includes('show_maintenance')) {
		return 'store_type=maintenance';
	} else if (pageAccess.includes('show_general')) {
		return 'store_type=general';
	} else if (pageAccess.includes('show_it_store')) {
		return 'store_type=it_store';
	} else {
		return '';
	}
};

const useGenerateFieldDefs = ({
	data,
	remove,
	request,
	provider,
	isNew = true,
	watch,
	form,
}: IGenerateFieldDefsProps): FieldDef[] => {
	const pageAccess = useAccess('procurement__requisition') as string[];

	const { data: itemList } = useOtherItem<IFormSelectOption[]>(getAccess(pageAccess));

	const fieldName = isNew ? 'new_item_requisition' : 'item_requisition';
	// Copy req_quantity to provided_quantity for the given index
	const handleCopy = (index: number) => {
		const reqQuantity = form.getValues(`${fieldName}.${index}.req_quantity`);
		form.setValue(`${fieldName}.${index}.provided_quantity`, reqQuantity, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	return [
		{
			header: 'ID',
			accessorKey: 'index',
			type: 'custom',
			component: (index: number) => {
				const idx = isNew && watch ? watch('item_requisition')?.length : 0;
				return <span className='ms-4'>{idx + index + 1}</span>;
			},
		},
		{
			header: 'Item',
			accessorKey: 'item_uuid',
			type: 'select',
			placeholder: 'Select Item',
			options: itemList || [],
			unique: true,
			excludeOptions: watch ? [...(watch(`${fieldName}`)?.map((item) => item.item_uuid) || [])] : [],
			disabled: provider || !isNew || (watch ? watch('is_received') : false),
		},
		{
			header: 'Request Quantity',
			accessorKey: 'req_quantity',
			type: 'custom',
			component: (index: number) => {
				const itemUuid = watch ? watch(`${fieldName}.${index}.item_uuid`) : '';
				const unit = itemList?.find((item) => item.value === itemUuid)?.unit ?? '';
				return (
					<FormField
						control={form.control}
						name={`${fieldName}.${index}.req_quantity`}
						render={(props) => (
							<CoreForm.JoinInputUnit
								disableLabel={true}
								type='number'
								label='Request Quantity'
								disabled={provider || (watch ? watch('is_received') : false)}
								unit={unit}
								{...props}
							>
								{provider && (
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
								)}
							</CoreForm.JoinInputUnit>
						)}
					/>
				);
			},
		},
		{
			header: 'Stock Quantity',
			accessorKey: 'stock_quantity',
			type: 'join-input-unit',
			inputType: 'number',
			disabled: true,
			hidden: request,
			unit: (index: number) => {
				const itemUuid = watch ? watch(`${fieldName}.${index}.item_uuid`) : '';
				return itemList?.find((item) => item.value === itemUuid)?.unit ?? '';
			},
		},
		{
			header: 'Provided Quantity',
			accessorKey: 'provided_quantity',
			type: 'join-input-unit',
			inputType: 'number',
			disabled: request || (watch ? watch('is_received') : false),
			hidden: isNew,
			unit: (index: number) => {
				const itemUuid = watch ? watch(`${fieldName}.${index}.item_uuid`) : '';
				return itemList?.find((item) => item.value === itemUuid)?.unit ?? '';
			},
		},
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'textarea',
			disabled: watch ? watch('is_received') : false,
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return (
					<FieldActionButton
						handleRemove={remove}
						hidden={watch ? watch('is_received') : false}
						index={index}
					/>
				);
			},
		},
	];
};

export default useGenerateFieldDefs;
