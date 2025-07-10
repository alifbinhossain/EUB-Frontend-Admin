export const fdeQK = {
	all: () => ['fde'],

	// * Question Category
	questionCategory: () => [...fdeQK.all(), 'question-category'],
	questionCategoryByUUID: (uuid: string) => [...fdeQK.questionCategory(), uuid],

	//*Question
	question: (query?: string) => [...fdeQK.all(), 'question', query],
	questionByUUID: (uuid: string) => [...fdeQK.question(), uuid],

	//*Responding Student
	respondingStudent: () => [...fdeQK.all(), 'responding-student'],
	respondingStudentByUUID: (uuid: string) => [...fdeQK.respondingStudent(), uuid],
	formFullResponse: (uuid: string) => [...fdeQK.respondingStudent(), 'form-full-response', uuid],

	//*Evolution
	list: (query: string) => [...fdeQK.all(), 'list', query],

	// ? Report
	// * Teacher Evaluation
	reportTeacherEvaluation: (uuid: string) => [...fdeQK.all(), 'report', 'teacher-evaluation', 'semester-wise', uuid],
	reportTeacherEvaluationTeacher: (departmentUuid: string, teacherUuid: string) => [
		...fdeQK.all(),
		'report',
		'teacher-evaluation',
		'teacher-wise',
		departmentUuid,
		teacherUuid,
	],
};
