import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps } from '@/types';

import {
	IClubTableData,
	IJobCircularTableData,
	INewsTableData,
	IPolicyTableData,
	ITenderTableData,
} from '../columns/columns.type';

// * Job Circular
export interface IJobCircularAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: IJobCircularTableData | null;
}

// * Club
export interface IClubAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IClubTableData | null;
}

// * News
export interface INewsAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: INewsTableData | null;
}

export interface IPolicyAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: IPolicyTableData | null;
}
export interface ITenderAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: ITenderTableData | null;
}
