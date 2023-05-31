import { InvoiceDb } from '@routes/invoice/interfaces';
import { fastify } from '@src/config';
import * as service from '@routes/invoice/service';

export const getInvoices = async (): Promise<InvoiceDb[]> => {
	fastify.log.info('Getting invoices...');
	return service.getInvoices();
};
