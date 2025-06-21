import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

import { useOtherBank, useOtherItemWorkOrder, useOtherVendor } from '@/lib/common-queries/other';
import { getDateTime } from '@/utils';

import { IBill } from '../config/schema';

const Header = (data: IBill) => {
	const form = useFormContext<IBill>();
	const { data: bankOptions } = useOtherBank<IFormSelectOption[]>();
	const { data: vendorOptions } = useOtherVendor<IFormSelectOption[]>();
	const { data: ItemWorkOrderOptions } = useOtherItemWorkOrder<IFormSelectOption[]>(
		`vendor_uuid=${form.watch('vendor_uuid') || ''}`
	);
	const isComplete = data?.is_completed || false;

	return (
		<CoreForm.Section
			title={`Information`}
			extraHeader={
				<div className='flex items-center justify-center gap-4'>
					<FormField
						control={form.control}
						name='completed_date'
						render={(props) => (
							<CoreForm.DatePicker disableLabel placeholder='Completed Date' disabled {...props} />
						)}
					/>
					<FormField
						control={form.control}
						name='is_completed'
						render={(props) => (
							<CoreForm.Switch
								labelClassName='text-slate-100'
								label='Complete'
								onCheckedChange={(e) => {
									if (e) {
										form.setValue('completed_date', getDateTime());
									} else {
										form.setValue('completed_date', null);
									}
								}}
								{...props}
							/>
						)}
					/>
				</div>
			}
		>
			<FormField
				control={form.control}
				name='vendor_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Vendor'
						menuPortalTarget={document.body}
						options={vendorOptions!}
						placeholder='Select Vendor'
						isDisabled={isComplete}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='bank_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Bank'
						menuPortalTarget={document.body}
						options={bankOptions!}
						placeholder='Select Bank'
						isDisabled={isComplete}
						{...props}
					/>
				)}
			/>
		</CoreForm.Section>
	);
};

export default Header;
