export const serviceQK = {
	all: () => ['service'],

	// * category
	service: () => [...serviceQK.all(), 'all-service'],
	quotations: (uuid: string) => [...serviceQK.service(), 'quotations', uuid],
	generalNotes: (uuid: string) => [...serviceQK.service(), 'general-notes', uuid],
	serviceDetails: (uuid: string) => [...serviceQK.all(), 'service-details', uuid],
};
