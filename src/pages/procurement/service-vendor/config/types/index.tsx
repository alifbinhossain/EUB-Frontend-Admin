import { IDefaultAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import { IServiceVendorTableData } from '../columns/columns.type';

//* Visitor
export interface IServiceVendorAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IServiceVendorTableData | null;
}
