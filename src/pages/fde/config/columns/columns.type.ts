//* Question Category Table Data
export type IQuestionCategoryTableData = {
	uuid: string;
	name: string;
	index: number;
	min_percentage: number;
};

//* FDE Question
export type IQuestionTableData = {
	uuid: string;
	qsn_category_uuid: string;
	qsn_category_name?: string;
	name: string;
	index: number;
	active: boolean;
};
//*FDE respond Student
export type IRespondingStudentTableData = {
	uuid: string;
	ID: string;
	sem_crs_thr_entry_uuid: string;
	evaluation_time: 'mid' | 'final';
};

//* FDE List
export type IFDEListTableData = {
	uuid: string;
	semester_uuid: string;
	semester_name: string;
	course_section_uuid: string;
	teacher_uuid: string;
	class_size: number;
	is_mid_evaluation_complete: boolean;
	is_final_evaluation_complete: boolean;
	mid_evaluation_response: number;
	final_evaluation_response: number;
};
