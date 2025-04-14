import { IDefaultAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import { IInternalCostCenterTableData } from '../columns/columns.type';

//* Internal Cost Center
export interface IInternalCostCenterAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IInternalCostCenterTableData | null;
}
