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
	//* Portfolio Department
	portfolioDepartments: () => [...otherQK.all(), 'portfolio', 'departments'],
};

export default otherQK;
