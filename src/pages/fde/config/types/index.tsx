import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import '../columns/columns.type';

import { IQuestionCategoryTableData, IQuestionTableData } from '../columns/columns.type';

//* Question Category
export interface IQuestionCategoryAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IQuestionCategoryTableData | null;
}
//* Question
export interface IQuestionAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IQuestionTableData | null;
}
