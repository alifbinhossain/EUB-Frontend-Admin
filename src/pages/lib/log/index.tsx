import { useEffect } from 'react';

import AssignList from './assign-list';
import RoomAllocation from './room-allocation';

const Log = () => {
	useEffect(() => {
		document.title = 'FDE Log';
	}, []);
	return (
		<div className='space-y-8'>
			<AssignList />
			<RoomAllocation />
		</div>
	);
};
export default Log;
