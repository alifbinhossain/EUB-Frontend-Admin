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
