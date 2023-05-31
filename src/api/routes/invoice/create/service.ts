import { fastify } from '@src/config';
import { v4 as uuid } from 'uuid';
import { InvoiceDb, Invoice } from '@routes/invoice/interfaces';
import dayjs from 'dayjs';
import * as service from '@routes/invoice/service';

export interface Return {
	invoices: InvoiceDb[];
	invoice: InvoiceDb;
}

export const create = async (body: Invoice): Promise<Return> => {
	fastify.log.info('Getting invoices...');
	let invoices: InvoiceDb[] = [];
	try {
		invoices = await service.getInvoices();
	} catch (e) {
		fastify.log.error(e);
		fastify.log.info('Defaulting invoices to empty array');
	}

	const invoice = {
		id: uuid(),
		amount: body.amount,
		expiration_date: dayjs().add(1, 'month').toISOString(),
		company_id: body.company_id,
		description: body.description,
	};
	invoices.push(invoice);

	fastify.log.info('Setting invoices...');
	await service.setInvoices(invoices);

	return { invoices, invoice };
};
