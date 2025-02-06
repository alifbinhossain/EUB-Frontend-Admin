const otherQK = {
	all: () => ['other'],

	//* HR
	hr: () => [...otherQK.all(), 'hr'],
	//* Department
	department: () => [...otherQK.all(), 'department'],
	//* Designation
	designation: () => [...otherQK.all(), 'designation'],
	//* Group
	group: () => [...otherQK.all(), 'group'],

	//* Brand
	brand: () => [...otherQK.all(), 'brand'],
	//* Model
	model: () => [...otherQK.all(), 'model'],
	//* Size
	size: () => [...otherQK.all(), 'size'],
	//* Category
	category: () => [...otherQK.all(), 'category'],

	//* Branch
	branch: () => [...otherQK.all(), 'branch'],

	//* Product
	product: () => [...otherQK.all(), 'product'],

	//* Vendor
	vendor: () => [...otherQK.all(), 'vendor'],

	//* Stock
	stock: () => [...otherQK.all(), 'stock'],

	//* purchase
	purchase: () => [...otherQK.all(), 'purchase'],
	//* Warehouse
	warehouse: () => [...otherQK.all(), 'warehouse'],

	//* Room
	room: () => [...otherQK.all(), 'room'],

	//* Rack
	rack: () => [...otherQK.all(), 'rack'],

	//* Floor
	floor: () => [...otherQK.all(), 'floor'],
	//* Box
	box: () => [...otherQK.all(), 'box'],
	//* Problem
	problem: () => [...otherQK.all(), 'problem'],
	//*Section
	section: () => [...otherQK.all(), 'section'],
	//* User
	user: () => [...otherQK.all(), 'user'],
	userByQuery: (query: string) => [...otherQK.all(), 'byUserQuery', query],
};

export default otherQK;
