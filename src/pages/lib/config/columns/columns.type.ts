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
