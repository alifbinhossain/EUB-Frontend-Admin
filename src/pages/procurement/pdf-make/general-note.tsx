import useRHF from '@/hooks/useRHF';

import Pdf from '@/components/pdf/general-statement';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { GENERAL_STATEMENT_NULL, GENERAL_STATEMENT_SCHEMA, IGeneralStatement } from './config/schema';

const AddOrUpdate = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const form = useRHF(GENERAL_STATEMENT_SCHEMA, GENERAL_STATEMENT_NULL);

	const onClose = () => {
		form.reset(GENERAL_STATEMENT_NULL);
		setOpen((prev) => !prev);
	};

	// Submit handler
	async function onSubmit(values: IGeneralStatement) {
		const printWindow = window.open('', '_blank');
		Pdf(values)?.print({}, printWindow);
	}

	return (
		<>
			{
				<AddModal open={open} setOpen={onClose} title='Create General Note' form={form} onSubmit={onSubmit}>
					<FormField
						control={form.control}
						name='general_note'
						render={(props) => <CoreForm.Textarea label='General Note' {...props} />}
					/>
				</AddModal>
			}
		</>
	);
};

export default AddOrUpdate;
