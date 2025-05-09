import { lazy, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import renderSuspenseModals from '@/utils/renderSuspenseModals';

const GeneralNote = lazy(() => import('./general-note'));
const PdfMaker = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const handleWorkOrder = () => {
		navigate('/procurement/pdf/generate/work-order-form');
	};
	const handleRequisitionForm = () => {
		navigate('/procurement/pdf/generate/item-requisition-form-capital');
	};
	const handleComparativeStatement = () => {
		navigate('/procurement/pdf/generate/comparative-statement');
	};

	return (
		<>
			<div className='flex h-full flex-col items-center justify-center gap-2'>
				<Button variant={'accent'} onClick={() => setOpen(true)}>
					Add General Note
				</Button>
				<Button variant={'accent'} onClick={() => handleWorkOrder()}>
					Work Order
				</Button>
				<Button variant={'accent'} onClick={() => handleRequisitionForm()}>
					Requisition Form
				</Button>
				<Button variant={'accent'} onClick={() => handleComparativeStatement()}>
					Comparative Statement
				</Button>
				{renderSuspenseModals([
					<GeneralNote
						{...{
							open: open,
							setOpen: setOpen,
						}}
					/>,
				])}
			</div>
		</>
	);
};

export default PdfMaker;
