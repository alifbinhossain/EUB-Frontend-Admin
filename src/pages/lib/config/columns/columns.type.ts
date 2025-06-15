//* SemesterTableData
export type ISemesterTableData = {
	uuid: string;
	name: string;
	stated_at: string;
	mid_started_at: string;
	final_started_at: string;
	ended_at: string;
};

//* CourseTableData
export type ICourseTableData = {
	id: number;
	uuid: string;
	name: string;
	code: string;
};
//*CourseSectionTableData
export type ICourseSectionTableData = {
	id: number;
	uuid: string;
	course_uuid?: string;
	name: string;
};
//* Semester Course Table Entry
export type ISemesterCourseTableData = {
	id: number;
	uuid: string;
	course_uuid: string;
	semester_uuid: string;
	course_section_uuid: string;
	teachers_uuid: string;
	class_size: number;
	is_mid_evaluation_complete: boolean;
	is_final_evaluation_complete: boolean;
};
