import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import '../columns/columns.type';

import { IItemTableData } from '../columns/columns.type';

//* Visitor
export interface IItemAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IItemTableData | null;
}
