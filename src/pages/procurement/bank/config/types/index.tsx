import { IDefaultAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import { IBankTableData } from '../columns/columns.type';

//* Category
export interface IBankAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IBankTableData | null;
}
