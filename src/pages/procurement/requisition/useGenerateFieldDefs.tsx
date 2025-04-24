import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
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
	isNew?: boolean;
}

const useGenerateFieldDefs = ({
	data,
	remove,
	request,
	provider,
	isNew = true,
	watch,
}: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: itemList } = useOtherItem<IFormSelectOption[]>();

	return [
		{
			header: 'Item',
			accessorKey: 'item_uuid',
			type: 'select',
			placeholder: 'Select Item',
			options: itemList || [],
			unique: true,
			excludeOptions: data.item_requisition.map((item) => item.item_uuid) || [],
			disabled: provider || !isNew || (watch ? watch('is_received') : false),
		},
		{
			header: 'Request Quantity',
			accessorKey: 'req_quantity',
			type: 'join-input-unit',
			disabled: provider || (watch ? watch('is_received') : false),
			unit: (index: number) => {
				const itemUuid = watch ? watch(`item_requisition.${index}.item_uuid`) : '';
				console.log(itemUuid);
				return itemList?.find((item) => item.value === itemUuid)?.unit ?? '';
			},
		},
		{
			header: 'Provided Quantity',
			accessorKey: 'provided_quantity',
			type: 'join-input-unit',
			disabled: request || (watch ? watch('is_received') : false),
			hidden: isNew,
			unit: (index: number) => {
				const itemUuid = watch ? watch(`item_requisition.${index}.item_uuid`) : '';
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
