import { useEffect } from 'react';

import ItemRequisition from './item-requisition';
import ItemTransferLog from './item-transfer-log';
import ItemWorkOrderEntry from './item-work-order-entry';

const Log = () => {
	useEffect(() => {
		document.title = 'Store Log';
	}, []);
	return (
		<div>
			{/* <ItemTransferLog />
			<hr className='border-secondary-content my-6 border-2 border-dashed' /> */}
			<ItemTransferLog />
			<hr className='border-secondary-content my-6 border-2 border-dashed' />
			<ItemWorkOrderEntry />
			<hr className='border-secondary-content my-6 border-2 border-dashed' />
			<ItemRequisition />
		</div>
	);
};
export default Log;
