import { IDefaultAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import { ISubPurchaseCostCenterTableData } from '../columns/columns.type';

//* Visitor
export interface ISubPurchaseCostCenterAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ISubPurchaseCostCenterTableData | null;
}
