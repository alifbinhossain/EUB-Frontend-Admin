import { IDefaultAddOrUpdateProps } from '@/types';

import { IBotTableData } from '../columns/columns.type';

//* designation
export interface IBotAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IBotTableData | null;
}
