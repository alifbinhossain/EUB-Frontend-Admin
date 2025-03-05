const otherQK = {
	all: () => ['other'],

	//* HR
	hr: () => [...otherQK.all(), 'hr'],

	//* Department
	department: () => [...otherQK.all(), 'department'],

	//* Designation
	designation: () => [...otherQK.all(), 'designation'],

	//* Faculty
	faculty: () => [...otherQK.all(), 'faculty'],
	//* User
	user: () => [...otherQK.all(), 'user'],
	userByQuery: (query: string) => [...otherQK.all(), 'byUserQuery', query],

	//* Programs
	programs: () => [...otherQK.all(), 'programs'],
	//* Departments
	departments: (query: string) => [...otherQK.all(), 'departments', ...(query ? [query] : [])],

	//* Category
	category: () => [...otherQK.all(), 'category'],
};

export default otherQK;
