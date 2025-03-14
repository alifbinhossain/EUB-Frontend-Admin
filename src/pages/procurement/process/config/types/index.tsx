import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import '../columns/columns.type';

import { IProcessTableData } from '../columns/columns.type';

//* Visitor
export interface IProcessAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IProcessTableData | null;
}
