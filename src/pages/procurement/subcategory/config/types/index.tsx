import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import '../columns/columns.type';

import { ISubCategoryTableData } from '../columns/columns.type';

//* Visitor
export interface ISubCategoryAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ISubCategoryTableData | null;
}
