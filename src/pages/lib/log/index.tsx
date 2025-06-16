import { useEffect } from 'react';

import AssignList from './assign-list';

const Log = () => {
	useEffect(() => {
		document.title = 'FDE Log';
	}, []);
	return (
		<div>
			<AssignList />
		</div>
	);
};
export default Log;
