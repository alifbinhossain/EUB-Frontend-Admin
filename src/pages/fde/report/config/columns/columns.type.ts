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

// ? Report
//* Teacher Evaluation
export type IReportTeacherEvaluationTableData = {
	uuid: string;
	semester_uuid: string;
	semester_name: string;
	teacher_uuid: string;
	teacher_name: string;
	appointment_date: string;
	department_name: string;
	performance_key: {
		exam_related_discussion: number;
		organization_of_the_lessons: number;
		presentation_of_teaching_materials: number;
		interpretation_of_teaching_materials: number;
		interpersonal_discussion_inside_the_classroom: number;
		interpersonal_discussion_outside_the_classroom: number;
	};
	mid_performance_percentage: number;
	final_performance_percentage: number;
	average_performance_percentage: number;
	change_in_performance_percentage: number;
};

//* Teacher Evaluation Teacher
export type IReportTeacherEvaluationTeacherTableData = {
	teacher_name: string;
	year: {
		semester_year: string;
		semester: {
			name: string;
			score: {
				mid_performance_percentage: number;
				final_performance_percentage: number;
			};
		}[];
	}[];
};

// * Department Evaluation Semester
export type IReportDepartmentEvaluationSemesterTableData = {};
