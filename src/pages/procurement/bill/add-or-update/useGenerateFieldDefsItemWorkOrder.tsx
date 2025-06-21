import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import CoreForm from '@/components/core/form'; // Fix the import path
import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherItemWorkOrder } from '@/lib/common-queries/other';

import { IProcureStoreTableData } from '../../procure(store)/config/columns/columns.type';
import { IBill } from '../config/schema';
import { types } from '../utills';

interface IGenerateFieldDefsProps {
	remove: (index: any) => void;
	watch?: UseFormWatch<IBill>;
	form: any;
	isUpdate: boolean;
	data: any;
}

const useGenerateFieldDefs = ({ remove, watch, form, isUpdate, data }: IGenerateFieldDefsProps): FieldDef[] => {
	const query = isUpdate
		? `vendor_uuid=${form.watch('vendor_uuid') || ''}&bill_uuid=${data?.uuid || ''}`
		: `vendor_uuid=${form.watch('vendor_uuid') || ''}&bill_uuid=null`;
	const { data: ItemWorkOrderOptions } = useOtherItemWorkOrder<IFormSelectOption[]>(`${query}`);

	const selectedValues = form.watch('item_work_order')?.map((item: any) => item.uuid) || [];

	return [
		{
			header: 'ID',
			accessorKey: 'uuid',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`item_work_order.${index}.uuid`}
						render={(props) => (
							<CoreForm.ReactSelect
								disableLabel={true}
								options={ItemWorkOrderOptions!}
								menuPortalTarget={document.body}
								unique={true}
								excludeOptions={selectedValues}
								onChange={(e: { label: string; value: string; total_amount: number }) => {
									form.setValue(`item_work_order.${index}.uuid`, e?.value);
									form.setValue(`item_work_order.${index}.total_amount`, e?.total_amount);
								}}
								isDisabled={data?.is_completed}
								placeholder='Select Item'
								{...props}
							/>
						)}
					/>
				);
			},
		},
		{
			header: 'Total Amount',
			accessorKey: 'total_amount',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`item_work_order.${index}.total_amount`}
						render={(props) => (
							<CoreForm.Input
								disableLabel={true}
								type='number'
								placeholder='Total Amount'
								disabled={true}
								{...props}
							/>
						)}
					/>
				);
			},
		},

		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return <FieldActionButton handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
