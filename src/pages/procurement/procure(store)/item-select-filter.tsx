import useAccess from '@/hooks/useAccess';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherItem, useOtherRequestedItems } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';

import { ICustomItemSelectOptions } from './utils';

const getAccess = (pageAccess: string[]) => {
	const types: string[] = [];

	if (pageAccess.includes('show_maintenance')) {
		types.push('maintenance');
	}
	if (pageAccess.includes('show_general')) {
		types.push('general');
	}
	if (pageAccess.includes('show_it_store')) {
		types.push('it_store');
	}

	return types.length > 0 ? `store_type=${types.join(',')}` : '';
};
const ItemSelectFilter: React.FC<{ uuid?: string; form: any; index: number; disabled?: boolean }> = ({
	uuid,
	form,
	index,
	disabled,
}) => {
	const pageAccess = useAccess('procurement__item') as string[];
	const query = uuid ? `${getAccess(pageAccess)}` : `item_work_order_uuid=null&${getAccess(pageAccess)}`;
	const { data: itemList } = useOtherRequestedItems<ICustomItemSelectOptions[]>(query);
	const { data: withOutReq } = useOtherItem<ICustomItemSelectOptions[]>(getAccess(pageAccess));

	const fieldName = 'item_work_order_entry';
	const selectedValues = form.watch('item_work_order_entry')?.map((item: any) => item.uuid) || [];
	const selectedValuesWithOutReq = form.watch('item_work_order_entry')?.map((item: any) => item.item_uuid) || [];

	const options = form.watch('without_item_request') ? withOutReq : itemList;
	const optionsToExclude = form.watch('without_item_request') ? selectedValuesWithOutReq : selectedValues;

	return (
		<FormField
			control={form.control}
			name={`${fieldName}.${index}.uuid`}
			render={(props) => (
				<CoreForm.ReactSelect
					disableLabel={true}
					options={options!}
					menuPortalTarget={document.body}
					unique={true}
					excludeOptions={optionsToExclude}
					onChange={(e: ICustomItemSelectOptions) => {
						if (form.watch('without_item_request')) {
							form.setValue(`${fieldName}.${index}.item_uuid`, String(e?.value));
							form.setValue(`${fieldName}.${index}.uuid`, '');
						} else {
							form.setValue(`${fieldName}.${index}.uuid`, String(e?.value));
							form.setValue(`${fieldName}.${index}.item_uuid`, String(e?.item_uuid));
							form.setValue(`${fieldName}.${index}.request_quantity`, e?.request_quantity);
						}
					}}
					value={options?.find((option) => {
						if (form.watch('without_item_request')) {
							return option.value === form.watch(`${fieldName}.${index}.item_uuid`);
						} else {
							return option.value === form.watch(`${fieldName}.${index}.uuid`);
						}
					})}
					isDisabled={disabled}
					placeholder='Select Item'
					{...props}
				/>
			)}
		/>
	);
};

export default ItemSelectFilter;
