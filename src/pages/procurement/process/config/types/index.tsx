import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import '../columns/columns.type';

import { IProcessTableData } from '../columns/columns.type';

//* Visitor
export interface IVisitorAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IProcessTableData | null;
}
