import { Copy } from 'lucide-react';

import { IFormSelectOption } from '@/components/core/form/types';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { useOtherRequestedItems } from '@/lib/common-queries/other';

import { ICustomItemSelectOptions } from './utils';

const RequestQuantity: React.FC<{ uuid?: string; form: any; index: number; hideCopyButton: boolean }> = ({
	uuid,
	form,
	index,
	hideCopyButton,
}) => {
	const query = uuid ? '' : `item_work_order_uuid=null`;
	const { data: itemList } = useOtherRequestedItems<ICustomItemSelectOptions[]>(query);
	const fieldName = 'item_work_order_entry';
	const itemUuid = form.watch ? form.watch(`${fieldName}.${index}.uuid`) : '';
	const unit = itemList?.find((item) => item.value === itemUuid)?.unit ?? '';
	const handleCopy = (index: number) => {
		const reqQuantity = form.getValues(`${fieldName}.${index}.request_quantity`);

		form.setValue(`${fieldName}.${index}.provided_quantity`, reqQuantity, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};
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
					{hideCopyButton && (
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
};

export default RequestQuantity;
