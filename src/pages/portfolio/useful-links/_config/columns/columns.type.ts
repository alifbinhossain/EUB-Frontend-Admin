//* Job Circular
export type IJobCircularTableData = {
	id: number;
	uuid: string;
	title: string;
	faculty_uuid: string;
	faculty_name: string;
	category: string;
	location: string;
	file: string;
	deadline: Date;
	remarks: string;
};

// * Club
export type IClubTableData = {
	id: number;
	uuid: string;
	name: string;
	department_uuid: string;
	president_uuid: string;
	message: string;
};

// * News
export type INewsTableData = {
	id: number;
	uuid: string;
	title: string;
	subtitle: string;
	description: string;
	content: string;
	cover_image: string;
	published_date: string;
	department_uuid: string;
};

//* Policy
export type IPolicyTableData = {
	id: number;
	uuid: string;
	name: string;
	department_uuid: string;
	published_date: string;
	file?: string;
	remarks: string;
};

//* Tender
export type ITenderTableData = {
	id: number;
	uuid: string;
	table_name: string;
	code: string;
	type: string;
	title: string;
	published_date: string;
	file?: string;
	remarks: string;
};
