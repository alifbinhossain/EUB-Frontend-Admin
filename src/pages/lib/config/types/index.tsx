import { IDefaultAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import { ICourseTableData, IRoomTableData, ISemesterTableData } from '../columns/columns.type';

//* Semester
export interface ISemesterAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ISemesterTableData | null;
}

//* Room
export interface IRoomAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IRoomTableData | null;
}
//* Course
export interface ICourseAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ICourseTableData | null;
}
