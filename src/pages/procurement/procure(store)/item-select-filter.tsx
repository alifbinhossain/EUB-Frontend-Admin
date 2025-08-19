import useAccess from '@/hooks/useAccess';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherRequestedItems } from '@/lib/common-queries/other';

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
	const { data: itemList } = useOtherRequestedItems<ICustomItemSelectOptions[]>(
		form.watch('without_item_request') ? '' : query
	);
	const fieldName = 'item_work_order_entry';
	const selectedValues = form.watch('item_work_order_entry')?.map((item: any) => item.uuid) || [];
	return (
		<FormField
			control={form.control}
			name={`${fieldName}.${index}.uuid`}
			render={(props) => (
				<CoreForm.ReactSelect
					disableLabel={true}
					options={itemList!}
					menuPortalTarget={document.body}
					unique={true}
					excludeOptions={selectedValues}
					onChange={(e: ICustomItemSelectOptions) => {
						form.setValue(`${fieldName}.${index}.uuid`, String(e?.value));
						form.setValue(`${fieldName}.${index}.item_uuid`, String(e?.item_uuid));
						form.setValue(`${fieldName}.${index}.request_quantity`, e?.request_quantity);
					}}
					isDisabled={disabled}
					placeholder='Select Item'
					{...props}
				/>
			)}
		/>
	);
};

export default ItemSelectFilter;
