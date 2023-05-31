export interface Invoice {
	amount: number;
	company_id: string;
	description: string;
}

export interface InvoiceDb extends Invoice {
	id: string;
	expiration_date: string;
}
