import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import '../columns/columns.type';

import { IPurchaseCostCenterTableData } from '../columns/columns.type';

//* Visitor
export interface IPurchaseCostCenterAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IPurchaseCostCenterTableData | null;
}
