//* SemesterTableData
export type ISemesterTableData = {
	uuid: string;
	name: string;
	stated_at: string;
	started_at: string;
	mid_started_at: string;
	final_started_at: string;
	ended_at: string;
	remarks: string;
};

//* CourseTableData
export type ICourseTableData = {
	id: number;
	uuid: string;
	name: string;
	code: string;
};

//* CourseAssignTableData
export type ICourseAssignTableData = {
	id: number;
	uuid: string;
	name: string;
	stated_at: string;
	mid_started_at: string;
	final_started_at: string;
	ended_at: string;
};
