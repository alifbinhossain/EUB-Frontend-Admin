import { IDefaultAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import { IITemRequestTableData } from '../columns/columns.type';

//* Item Request
export interface IItemRequestAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IITemRequestTableData | null;
}
