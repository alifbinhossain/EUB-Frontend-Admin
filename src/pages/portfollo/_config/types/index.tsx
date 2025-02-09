import { IDefaultAddOrUpdateProps } from '@/types';

import { IBotTableData } from '../columns/columns.type';

//* bot
export interface IBotAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IBotTableData | null;
}
