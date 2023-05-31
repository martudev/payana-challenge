import { fastify } from '@src/config';
import { InvoiceDb } from '@routes/invoice/interfaces';
import dayjs from 'dayjs';
import * as service from '@routes/invoice/service';

export interface Return {
	notExpiredInvoices: InvoiceDb[];
	totalAmount: number;
}

export const getInvoices = async (): Promise<Return> => {
	const invoices = await service.getInvoices();

	fastify.log.info('Filtering invoices not expired...');
	const currentDateTime = dayjs();
	const notExpiredInvoices = invoices.filter((invoice) =>
		dayjs(invoice.expiration_date).isAfter(currentDateTime),
	);

	fastify.log.info('Calculating total amount...');
	const totalAmount = notExpiredInvoices.reduce((acc, invoice) => {
		acc += invoice.amount;
		return acc;
	}, 0);

	return { notExpiredInvoices, totalAmount };
};
