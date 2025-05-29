import { lazy, useMemo, useState } from 'react';
import { PageProvider } from '@/context';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

const GeneralNote = lazy(() => import('./general-note'));
const GeneralNoteBangla = lazy(() => import('./general-note-bangla'));

const PdfMaker = () => {
	const [open, setOpen] = useState(false);
	const pageInfo = new PageInfo('PDF (Generate)', '/procurement/pdf/generate', 'procurement__pdf_generate');
	const [openBangla, setOpenBangla] = useState(false);
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
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<div className='flex h-full flex-col items-center justify-center gap-2'>
				{/* <Button variant={'accent'} onClick={() => setOpen(true)}>
						Add General Note
					</Button> */}
				<Button variant={'accent'} onClick={() => setOpenBangla(true)}>
					Add General Note
				</Button>
				<Button variant={'accent'} onClick={() => handleWorkOrder()}>
					Work Order
				</Button>
				<Button variant={'accent'} onClick={() => handleRequisitionForm()}>
					Requisition Form (Capital)
				</Button>
				<Button variant={'accent'} onClick={() => handleComparativeStatement()}>
					Comparative Statement
				</Button>
				{renderSuspenseModals([
					// <GeneralNote
					// 	{...{
					// 		open: open,
					// 		setOpen: setOpen,
					// 	}}
					// />,
					<GeneralNoteBangla
						{...{
							open: openBangla,
							setOpen: setOpenBangla,
						}}
					/>,
				])}
			</div>
		</PageProvider>
	);
};

export default PdfMaker;
