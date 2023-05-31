import { RouteHandlerMethod } from 'fastify';
import * as service from '@routes/invoice/all/service';

export const handler: RouteHandlerMethod = async (request, reply) => {
	const invoices = await service.getInvoices();
	return { invoices };
};
