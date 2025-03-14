import { IDefaultAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import { IVendorTableData } from '../columns/columns.type';

//* Visitor
export interface IVendorAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IVendorTableData | null;
}
