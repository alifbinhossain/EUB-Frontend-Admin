import { useEffect } from 'react';

import ItemTransferLog from './item-transfer-log';

const Log = () => {
	useEffect(() => {
		document.title = 'Store Log';
	}, []);
	return (
		<div>
			<ItemTransferLog />
		</div>
	);
};
export default Log;
