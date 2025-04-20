import { IDefaultAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import { IITemTransferTableData } from '../columns/columns.type';

//* Visitor
export interface IItemTransferAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IITemTransferTableData | null;
}
