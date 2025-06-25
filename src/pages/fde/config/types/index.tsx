import { IDefaultAddOrUpdateProps } from '@/types';

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

export interface IFdeQuestion {
	uuid: string;
	qns_category_uuid: string;
	qns_category_name: string;
	name: string;
	index: number;
	active: boolean;
	created_by: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
}

export interface ISemCrsThrEntry {
	uuid: string;
	semester_uuid: string;
	course_section_uuid: string;
	teachers_uuid: string;
	class_size: number;
	is_mid_evaluation_complete: boolean;
	is_final_evaluation_complete: boolean;
	created_by: string;
	created_at: string;
	updated_at: string;
	remarks: string;
}

export interface IQuestionCategory {
	uuid: string;
	name: string;
	index: number;
	min_percentage: number;
	created_by: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
}
