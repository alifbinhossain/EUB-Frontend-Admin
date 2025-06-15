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
