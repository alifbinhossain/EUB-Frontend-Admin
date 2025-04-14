import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import '../columns/columns.type';

import { IRequisitionTableData } from '../columns/columns.type';

//* Requisition
export interface IRequisitionAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IRequisitionTableData | null;
}
