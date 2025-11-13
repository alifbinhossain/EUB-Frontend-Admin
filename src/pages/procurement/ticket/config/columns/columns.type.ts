// * Ticket
export type ITicketTableData = {
	req_ticket_id: string;
	uuid: string;
	is_resolved: boolean;
	department: string;
	problem_description: string;
	req_ticket_item: ITicketEntry[];

	created_at: string;
	updated_at: string;
	created_by_name: string;
};

export type ITicketEntry = {
	is_resolved?: boolean;
	uuid?: string;
	req_ticket_uuid?: string;
	item_uuid: string;
	item_name?: string;
	quantity: number;
	unit?: string;
	created_at?: string;
	updated_at?: string;
	created_by_name?: string;
	remarks?: string;
};
