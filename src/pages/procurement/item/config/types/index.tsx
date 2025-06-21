import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import '../columns/columns.type';

import { IItemTableData } from '../columns/columns.type';
import { IItemTransfer, IRequest } from '../schema';

//* Visitor
export interface IItemAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IItemTableData | null;
}
export interface IItemTransferAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IItemTransfer | null;
}

export interface IItemRequestAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IRequest | null;
}
