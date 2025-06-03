// * Visitor
export type IVisitorTableData = {
	id: number;
	uuid: string;
	name: string;
	mobile: string;
	category: string;
	status: string;

	// Call entry
	subject_preference: string;
	from_where: string;

	// FAQ
	prev_institution: string;
	department: string;
	through: string;

	remarks: string;
};
// * Contact Us
export type IContactUSTableData = {
	id?: number;
	uuid?: string;
	full_name: string;
	email: string;
	phone: string;
	question: string;
	description: string;
	is_response: boolean;
	remarks?: string;
};
