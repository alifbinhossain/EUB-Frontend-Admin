export const ticketQK = {
	all: () => ['ticket'],

	// * ticket
	ticket: () => [...ticketQK.all(), 'all-ticket'],
	ticketDetails: (uuid: string) => [...ticketQK.all(), 'ticket-details', uuid],
};
