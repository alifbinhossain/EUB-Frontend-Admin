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

export type IDataCourseAssign = {
	course_uuid: string;
	sem_crs_thr_entry: {
		uuid: string;
		semester_uuid: string;
		course_section_type: 'regular' | 'evening';
		course_section_uuid: string;
		teachers_uuid: string;
		class_size: number;
	}[];
};
