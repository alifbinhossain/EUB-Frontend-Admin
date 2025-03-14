export const generalNoteQK = {
	all: () => ['procurement'],

	// * generalNote
	generalNote: () => [...generalNoteQK.all(), 'generalNote'],
	generalNoteByUUID: (uuid: string) => [...generalNoteQK.generalNote(), uuid],
};
