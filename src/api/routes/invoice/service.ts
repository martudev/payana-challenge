import { DB } from '@services/db';
import { KEY } from '@routes/invoice/constants';
import { InvoiceDb } from '@routes/invoice/interfaces';
import { fastify } from '@src/config';

export const getInvoices = async (): Promise<InvoiceDb[]> => {
	fastify.log.info('Getting invoices...');
	const db = DB.get();
	const data = await db.get(KEY);

	if (!data) {
		throw new Error(`key '${KEY}' not found`);
	}

	return JSON.parse(data) as InvoiceDb[];
};

export const setInvoices = async (value: InvoiceDb[]): Promise<void> => {
	fastify.log.info('Setting value to invoices...');
	const db = DB.get();
	const response = await db.set(KEY, JSON.stringify(value));

	if (response !== 'OK') {
		throw new Error(`value with key '${KEY}' not saved correctly`);
	}
};
