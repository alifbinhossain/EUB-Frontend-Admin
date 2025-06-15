import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import '../columns/columns.type';

import { ICourseTableData, ISemesterTableData } from '../columns/columns.type';

//* Semester
export interface ISemesterAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ISemesterTableData | null;
}
//* Course
export interface ICourseAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ICourseTableData | null;
}
