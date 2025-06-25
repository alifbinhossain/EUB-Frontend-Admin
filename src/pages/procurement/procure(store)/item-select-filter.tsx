import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherRequestedItems } from '@/lib/common-queries/other';

import { ICustomItemSelectOptions } from './utils';

const ItemSelectFilter: React.FC<{ uuid?: string; form: any; index: number; disabled?: boolean }> = ({
	uuid,
	form,
	index,
	disabled,
}) => {
	const query = uuid ? '' : `item_work_order_uuid=null`;
	const { data: itemList } = useOtherRequestedItems<ICustomItemSelectOptions[]>(query);
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
