import { IDefaultFileAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import { IFormTableData } from '../columns/columns.type';

//* Visitor
export interface IFormAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: IFormTableData | null;
}
