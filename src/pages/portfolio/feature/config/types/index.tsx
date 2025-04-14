import { IDefaultFileAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import { IFeatureTableData } from '../columns/columns.type';

//* Feature
export interface IFeatureAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: IFeatureTableData | null;
}
