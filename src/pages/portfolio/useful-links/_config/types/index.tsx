import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
export interface INewsAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: INewsTableData | null;
	imagePostData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	imageUpdateData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

export interface IPolicyAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: IPolicyTableData | null;
}
export interface ITenderAddOrUpdateProps extends IDefaultFileAddOrUpdateProps {
	updatedData?: ITenderTableData | null;
}
